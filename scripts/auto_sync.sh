#!/usr/bin/env bash

# Simple auto-sync script to commit and push local changes to the current branch periodically.
# Behavior:
# - Stages all changes
# - If there is anything to commit, creates a timestamped commit
# - Rebases on remote and pushes to the same branch
# - Optional: if flake8 is available and Python files changed, runs flake8 and skips committing on failure

set -u

SYNC_INTERVAL_SECONDS="${AUTO_SYNC_INTERVAL:-60}"

get_current_branch() {
	git rev-parse --abbrev-ref HEAD
}

has_changes() {
	# Returns 0 if there are changes (tracked or untracked), 1 otherwise
	# Check working tree and index
	if ! git diff --quiet --ignore-submodules -- . 2>/dev/null; then
		return 0
	fi
	if ! git diff --cached --quiet --ignore-submodules -- . 2>/dev/null; then
		return 0
	fi
	# Also check untracked files
	if [ -n "$(git ls-files --others --exclude-standard)" ]; then
		return 0
	fi
	return 1
}

python_files_changed() {
	# Detect if there are Python files staged or in working dir
	if git diff --name-only -- '*.py' | grep -q ".py$"; then
		return 0
	fi
	if git diff --cached --name-only -- '*.py' | grep -q ".py$"; then
		return 0
	fi
	return 1
}

run_linters_if_available() {
	if command -v flake8 >/dev/null 2>&1; then
		if python_files_changed; then
			flake8 . || return 1
		fi
	fi
	return 0
}

while true; do
	# Ensure we are inside a git repo
	if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
		echo "[auto-sync] Not inside a git repository. Sleeping..."
		sleep "$SYNC_INTERVAL_SECONDS"
		continue
	fi

	BRANCH_NAME="$(get_current_branch)"

	# Fetch updates quietly (best-effort)
	git fetch --quiet origin || true

	if has_changes; then
		# Stage all
		git add -A

		# If still nothing staged, skip
		if git diff --cached --quiet --ignore-submodules -- . 2>/dev/null; then
			:
		else
			# Optionally run linters
			if ! run_linters_if_available; then
				echo "[auto-sync] Linters failed; skipping commit and resetting index."
				git reset -q
				sleep "$SYNC_INTERVAL_SECONDS"
				continue
			fi

			# Commit
			TIMESTAMP_UTC="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
			git commit -m "chore(sync): auto-sync at ${TIMESTAMP_UTC}" || true

			# Rebase on remote (best-effort)
			git pull --rebase origin "$BRANCH_NAME" || true

			# Push
			git push -u origin "$BRANCH_NAME" || true
		fi
	fi

	sleep "$SYNC_INTERVAL_SECONDS"
done


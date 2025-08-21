# Contributing to BrickBox

Thank you for your interest in contributing!

## Setup
1. Fork and clone the repository.
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -U pip
   pip install -r requirements.txt  # if the file exists
   pip install flake8 pytest
   ```
3. Generate the app icon:
   ```bash
   python scripts/decode_icon.py
   ```

## Testing
Run the linters and test suite before opening a pull request:
```bash
flake8 .
pytest
```

## Pull Requests
- Ensure your branch is up to date with `main`.
- Include tests for any new features or bug fixes.
- Confirm that `flake8` and `pytest` pass.
- Submit a clear, focused pull request describing your changes.

We appreciate your contributions and adherence to this guide.

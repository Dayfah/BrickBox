# syntax=docker/dockerfile:1

# --- Backend build stage --------------------------------------------------
FROM python:3.11-slim AS backend
WORKDIR /srv

# Copy backend source and assets
COPY scripts scripts
COPY assets assets

# Generate any derived assets (e.g. icon.png)
RUN python scripts/decode_icon.py

# --- Frontend build stage -------------------------------------------------
FROM node:20-alpine AS frontend
WORKDIR /app

# Copy frontend sources and install/build if package.json exists
COPY . .
RUN if [ -f package.json ]; then npm ci && npm run build; else echo "No package.json, skipping frontend build"; fi

# --- Runtime stage --------------------------------------------------------
FROM python:3.11-slim
WORKDIR /srv

# Bring in backend files and built frontend assets
COPY --from=backend /srv /srv
COPY --from=frontend /app/.next ./app/.next

EXPOSE 3000
CMD ["python", "-m", "http.server", "3000"]

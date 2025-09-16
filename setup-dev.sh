#!/usr/bin/env bash
set -euo pipefail

# Simple dev setup script for Linux/macOS.
# - Installs dependencies for backend and frontend
# - Starts both apps in dev mode
# - Prints useful URLs and env instructions

command -v npm >/dev/null 2>&1 || {
  echo "Error: npm is not installed or not on PATH." >&2
  echo "Please install Node.js (which includes npm) and try again." >&2
  exit 1
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Installing backend dependencies..."
(
  cd "$SCRIPT_DIR/backend"
  if [ -f package-lock.json ]; then
    npm ci
  else
    npm install
  fi
)

echo "Installing frontend dependencies..."
(
  cd "$SCRIPT_DIR/frontend"
  if [ -f package-lock.json ]; then
    npm ci
  else
    npm install
  fi
)

echo "Starting backend (dev) on http://localhost:3001 ..."
(
  cd "$SCRIPT_DIR/backend"
  nohup npm run start:dev > dev.log 2>&1 &
)

echo "Starting frontend (dev) on http://localhost:3000 ..."
(
  cd "$SCRIPT_DIR/frontend"
  nohup npm run dev > dev.log 2>&1 &
)

cat <<'INFO'

Frontend is running at:  http://localhost:3000
Backend is running at:   http://localhost:3001

If you don't see logs in this terminal, check:
  - backend/dev.log
  - frontend/dev.log

Next step: configure backend environment (backend/.env.development)
Open the file and confirm or update these values:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=chris
DB_NAME=betontalent

Default login credentials:
AUTH_EMAIL=dev@betontalent.com
AUTH_PASSWORD=admin

INFO

echo "Done. Happy hacking!"


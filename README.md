# BetOnTalent – Full‑Stack App

A NestJS backend (REST API with PostgreSQL + JWT) and a Next.js frontend.

## Quick Start

- Linux/macOS: `bash setup-dev.sh`
- Windows: run `setup-dev.bat`

The scripts install dependencies, start both apps, and print URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

Logs are written to `backend/dev.log` and `frontend/dev.log`.

## Setup Scripts

### Windows (setup-dev.bat)

- Open Command Prompt (cmd.exe) in the project root.
- Run: `setup-dev.bat` (or double‑click the file in Explorer).
- Access: Frontend at `http://localhost:3000`, Backend at `http://localhost:3001`.
- If you hit parsing issues, try: `cmd /c setup-dev.bat` and ensure the file uses CRLF line endings.

### Linux/macOS (setup-dev.sh)

- From the project root: `bash setup-dev.sh`
- Or make it executable once: `chmod +x setup-dev.sh` then run `./setup-dev.sh`.
- Access: Frontend at `http://localhost:3000`, Backend at `http://localhost:3001`.
- Logs are written to `backend/dev.log` and `frontend/dev.log`.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL running locally (defaults below)

## Backend Configuration

Edit `backend/.env.development` and confirm or update:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=chris
DB_NAME=betontalent

# Optional/auth defaults
AUTH_EMAIL=dev@betontalent.com
AUTH_PASSWORD=admin
```

- CORS is allowed from `http://localhost:3000` by default.
- Backend dev server binds to port `3001` (`PORT` in `.env.development`).

## Manual Setup (alternative to scripts)

Install dependencies:

```
# Backend
cd backend
npm ci  # or: npm install

# Frontend
cd ../frontend
npm ci  # or: npm install
```

Run dev servers:

```
# Backend (http://localhost:3001)
cd backend
npm run start:dev

# Frontend (http://localhost:3000)
cd frontend
npm run dev
```

## Scripts

- `setup-dev.sh` (Linux/macOS): installs packages and starts both apps in the background.
- `setup-dev.bat` (Windows): installs packages and opens two processes for backend and frontend.

## Folder Structure

- `backend/` – NestJS API, TypeORM, PostgreSQL
- `frontend/` – Next.js app (React + Tailwind)

## Troubleshooting

- Port in use: change ports or stop the conflicting process.
- No logs in terminal: check `backend/dev.log` and `frontend/dev.log`.
- Database connection errors: verify PostgreSQL is running and credentials in `backend/.env.development` are correct.

## Testing Guide

- See `docs/frontend-and-backend-testing.md` for step-by-step testing of the API and UI.
- If you need a PDF, export that Markdown to `docs/frontend-and-backend-testing.pdf` using your editor's Print/Export or a tool like `pandoc`.

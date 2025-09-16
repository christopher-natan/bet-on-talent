@echo off
SETLOCAL ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION

REM Simple dev setup script for Windows.
REM - Installs dependencies for backend and frontend
REM - Starts both apps in dev mode in separate windows
REM - Prints useful URLs and env instructions

where npm >NUL 2>&1
IF ERRORLEVEL 1 GOTO NONPM

REM Change to the directory of this script
cd /d "%~dp0"

echo Installing backend dependencies...
pushd backend
IF EXIST package-lock.json call npm ci
IF NOT EXIST package-lock.json call npm install
popd

echo Installing frontend dependencies...
pushd frontend
IF EXIST package-lock.json call npm ci
IF NOT EXIST package-lock.json call npm install
popd

echo Starting backend (dev) on http://localhost:3001 ...
start "backend" cmd /c "cd /d backend ^&^& npm run start:dev ^> dev.log 2^>^&1"

echo Starting frontend (dev) on http://localhost:3000 ...
start "frontend" cmd /c "cd /d frontend ^&^& npm run dev ^> dev.log 2^>^&1"

echo.
echo Frontend is running at:  http://localhost:3000
echo Backend is running at:   http://localhost:3001
echo.
echo If you don't see logs in this window, check:
echo   - backend\dev.log
echo   - frontend\dev.log
echo.
echo Next step: configure backend environment (backend\.env.development)
echo Open the file and confirm or update these values:
echo.
echo DB_HOST=localhost
echo DB_PORT=5432
echo DB_USERNAME=postgres
echo DB_PASSWORD=chris
echo DB_NAME=betontalent
echo.
echo Default login credentials:
echo AUTH_EMAIL=dev@betontalent.com
echo AUTH_PASSWORD=admin
echo.
echo Done. Happy hacking!

ENDLOCAL
exit /b 0

:NONPM
echo Error: npm is not installed or not on PATH.
echo Please install Node.js (which includes npm) and try again.
exit /b 1

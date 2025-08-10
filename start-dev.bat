@echo off
echo Starting JobSync Development Environment...
echo.
echo Backend will run on: http://localhost:3000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop both services
echo.

start "Backend" cmd /k "cd backend && npm run start:dev"
start "Frontend" cmd /k "cd frontend && npm run start:dev"

echo Both services are starting...
echo Backend and Frontend windows should open automatically.
echo.
pause 
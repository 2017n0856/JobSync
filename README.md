# JobSync Development Environment

This repository contains both the backend (NestJS) and frontend (React) applications for the JobSync platform.

## Quick Start

### Option 1: Using npm scripts (Recommended)

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start both services simultaneously:**
   ```bash
   npm run start:dev
   ```

### Option 2: Using platform-specific scripts

#### Windows
```bash
# Using batch file
start-dev.bat

# Using PowerShell
.\start-dev.ps1
```

#### Linux/Mac
```bash
# Make the script executable (first time only)
chmod +x start-dev.sh

# Run the script
./start-dev.sh
```

## Available Scripts

### Root Level Scripts
- `npm run start:dev` - Start both backend and frontend in development mode
- `npm run dev` - Start both backend and frontend in development mode (alias)
- `npm run dev:backend` - Start only the backend
- `npm run dev:frontend` - Start only the frontend
- `npm run install:all` - Install dependencies for all packages
- `npm run build` - Build both backend and frontend
- `npm run start` - Start both services in production mode

### Backend Scripts (in backend directory)
- `npm run start:dev` - Start backend in development mode with hot reload
- `npm run start` - Start backend in production mode
- `npm run build` - Build the backend application

### Frontend Scripts (in frontend directory)
- `npm run start:dev` - Start frontend development server
- `npm run build` - Build the frontend application
- `npm run preview` - Preview the built frontend application

## Service URLs

Once started, the services will be available at:

- **Backend API:** http://localhost:3000
- **Frontend App:** http://localhost:5173
- **API Documentation:** http://localhost:3000/api (Swagger)

## Prerequisites

Before running the development environment, make sure you have:

1. **Node.js** (v18 or higher)
2. **npm** (v8 or higher)
3. **PostgreSQL** database running
4. **Redis** server running (optional, for caching)

## Environment Setup

### Backend Environment
Copy the example environment file and configure your database:
```bash
cd backend
cp env.example .env
```

Edit `.env` with your database credentials and other configuration.

### Frontend Environment
The frontend will automatically connect to the backend at `http://localhost:3000`. If you need to change this, create a `.env` file in the frontend directory:
```bash
cd frontend
echo "VITE_API_BASE_URL=http://localhost:3000" > .env
```

## Stopping Services

- **npm scripts:** Press `Ctrl+C` in the terminal
- **Batch/PowerShell scripts:** Press `Ctrl+C` or close the terminal windows
- **Shell script:** Press `Ctrl+C` to stop both services gracefully

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error:

1. **Backend (port 3000):**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # Linux/Mac
   lsof -ti:3000 | xargs kill -9
   ```

2. **Frontend (port 5173):**
   ```bash
   # Windows
   netstat -ano | findstr :5173
   taskkill /PID <PID> /F

   # Linux/Mac
   lsof -ti:5173 | xargs kill -9
   ```

### Dependencies Issues
If you encounter dependency issues:
```bash
# Clean install all dependencies
rm -rf node_modules package-lock.json
cd backend && rm -rf node_modules package-lock.json
cd ../frontend && rm -rf node_modules package-lock.json
cd ..
npm run install:all
```

## Development Workflow

1. Start the development environment using any of the methods above
2. Make changes to your code
3. Backend will automatically reload on file changes
4. Frontend will automatically reload on file changes
5. Test your changes in the browser
6. Stop services when done

## Project Structure

```
JobSync/
├── backend/          # NestJS API server
├── frontend/         # React frontend application
├── package.json      # Root package.json with scripts
├── start-dev.bat     # Windows batch script
├── start-dev.ps1     # PowerShell script
├── start-dev.sh      # Unix shell script
└── README.md         # This file
``` 
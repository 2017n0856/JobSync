#!/bin/bash

echo "🚀 Starting JobSync Development Environment..."
echo ""
echo "📡 Backend will run on: http://localhost:3000"
echo "🌐 Frontend will run on: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both services"
echo ""

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Start backend in background
echo "🔧 Starting Backend..."
cd backend && npm run start:dev &
BACKEND_PID=$!

# Start frontend in background
echo "🎨 Starting Frontend..."
cd ../frontend && npm run start:dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both services are starting..."
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID 
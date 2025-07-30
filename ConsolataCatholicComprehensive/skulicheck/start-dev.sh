#!/bin/bash

# Start the backend server in the background
echo "Starting SkuliCheck backend server..."
cd server && python app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start the React development server
echo "Starting SkuliCheck frontend server..."
npm start &

# Cleanup function to kill backend when script exits
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
}

# Set trap to cleanup on script exit
trap cleanup EXIT
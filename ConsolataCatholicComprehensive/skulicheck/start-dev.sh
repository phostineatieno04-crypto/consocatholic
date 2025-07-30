
#!/bin/bash

echo "🚀 Starting SkuliCheck Development Environment..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
pip install -r requirements.txt
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Start backend in background
echo "🔧 Starting backend server..."
cd server
python app.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend development server..."
npm start

# Cleanup function
cleanup() {
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    exit 0
}

# Handle Ctrl+C
trap cleanup SIGINT

# Wait for frontend to exit
wait

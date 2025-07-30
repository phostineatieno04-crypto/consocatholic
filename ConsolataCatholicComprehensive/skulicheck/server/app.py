
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_mail import Mail, Message
import sqlite3
import hashlib
import secrets
import random
import string
import os
import json
from datetime import datetime, timedelta
import jwt

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'skulicheck-dev-secret-2024')

# Enable CORS for React frontend
CORS(app, origins=['http://localhost:4028', 'https://*.replit.dev'], supports_credentials=True)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASSWORD')
mail = Flask_Mail(app)

# Database setup
def init_db():
    conn = sqlite3.connect('skulicheck.db')
    c = conn.cursor()
    
    # Users table
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT NOT NULL,
        phone TEXT,
        employee_id TEXT,
        is_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    
    # Verification codes table
    c.execute('''CREATE TABLE IF NOT EXISTS verification_codes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        code TEXT NOT NULL,
        code_type TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )''')
    
    # Sessions table
    c.execute('''CREATE TABLE IF NOT EXISTS user_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        session_token TEXT UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        device_info TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )''')
    
    conn.commit()
    conn.close()

def generate_verification_code():
    return ''.join(random.choices(string.digits, k=6))

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def send_verification_email(email, code, code_type="registration"):
    try:
        msg = Message(
            subject=f'SkuliCheck - {code_type.title()} Verification Code',
            sender=app.config['MAIL_USERNAME'],
            recipients=[email]
        )
        msg.html = f'''
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Consolata Catholic Comprehensive School</h2>
            <h3>Your Verification Code</h3>
            <p>Your verification code is:</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px; color: #2563eb;">
                {code}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
        </div>
        '''
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Email sending failed: {e}")
        return False

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    required_fields = ['email', 'password', 'full_name', 'role']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    
    try:
        conn = sqlite3.connect('skulicheck.db')
        c = conn.cursor()
        
        # Check if user already exists
        c.execute('SELECT id FROM users WHERE email = ?', (data['email'],))
        if c.fetchone():
            return jsonify({'error': 'User already exists'}), 400
        
        # Create user
        password_hash = hash_password(data['password'])
        c.execute('''INSERT INTO users (email, password_hash, full_name, role, phone, employee_id)
                     VALUES (?, ?, ?, ?, ?, ?)''',
                  (data['email'], password_hash, data['full_name'], data['role'],
                   data.get('phone'), data.get('employee_id')))
        
        user_id = c.lastrowid
        
        # Generate verification code
        verification_code = generate_verification_code()
        expires_at = datetime.now() + timedelta(minutes=10)
        
        c.execute('''INSERT INTO verification_codes (user_id, code, code_type, expires_at)
                     VALUES (?, ?, ?, ?)''',
                  (user_id, verification_code, 'registration', expires_at))
        
        conn.commit()
        conn.close()
        
        # Send verification email
        email_sent = send_verification_email(data['email'], verification_code, 'registration')
        
        return jsonify({
            'message': 'Registration successful. Please check your email for verification code.',
            'user_id': user_id,
            'email_sent': email_sent
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/verify-email', methods=['POST'])
def verify_email():
    data = request.get_json()
    user_id = data.get('user_id')
    code = data.get('code')
    
    if not user_id or not code:
        return jsonify({'error': 'User ID and code are required'}), 400
    
    try:
        conn = sqlite3.connect('skulicheck.db')
        c = conn.cursor()
        
        # Check verification code
        c.execute('''SELECT id FROM verification_codes 
                     WHERE user_id = ? AND code = ? AND code_type = 'registration' 
                     AND expires_at > ? AND used = FALSE''',
                  (user_id, code, datetime.now()))
        
        verification = c.fetchone()
        if not verification:
            return jsonify({'error': 'Invalid or expired verification code'}), 400
        
        # Mark code as used and verify user
        c.execute('UPDATE verification_codes SET used = TRUE WHERE id = ?', (verification[0],))
        c.execute('UPDATE users SET is_verified = TRUE WHERE id = ?', (user_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Email verified successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    
    try:
        conn = sqlite3.connect('skulicheck.db')
        c = conn.cursor()
        
        # Check user credentials
        password_hash = hash_password(password)
        c.execute('''SELECT id, email, full_name, role, is_verified 
                     FROM users WHERE email = ? AND password_hash = ?''',
                  (email, password_hash))
        
        user = c.fetchone()
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        if not user[4]:  # is_verified
            return jsonify({'error': 'Please verify your email first'}), 401
        
        # Generate session token
        session_token = secrets.token_urlsafe(32)
        expires_at = datetime.now() + timedelta(days=7)
        
        c.execute('''INSERT INTO user_sessions (user_id, session_token, expires_at, device_info)
                     VALUES (?, ?, ?, ?)''',
                  (user[0], session_token, expires_at, request.headers.get('User-Agent')))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user[0],
                'email': user[1],
                'full_name': user[2],
                'role': user[3]
            },
            'session_token': session_token
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/send-mfa-code', methods=['POST'])
def send_mfa_code():
    data = request.get_json()
    email = data.get('email')
    method = data.get('method', 'email')  # email, sms, authenticator
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    
    try:
        conn = sqlite3.connect('skulicheck.db')
        c = conn.cursor()
        
        # Check if user exists
        c.execute('SELECT id FROM users WHERE email = ?', (email,))
        user = c.fetchone()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Generate MFA code
        mfa_code = generate_verification_code()
        expires_at = datetime.now() + timedelta(minutes=5)
        
        c.execute('''INSERT INTO verification_codes (user_id, code, code_type, expires_at)
                     VALUES (?, ?, ?, ?)''',
                  (user[0], mfa_code, f'mfa_{method}', expires_at))
        
        conn.commit()
        conn.close()
        
        # Send code based on method
        if method == 'email':
            email_sent = send_verification_email(email, mfa_code, 'MFA')
            return jsonify({
                'message': 'MFA code sent to your email',
                'method': method,
                'sent': email_sent
            }), 200
        elif method == 'sms':
            # TODO: Integrate with SMS service (Twilio, AWS SNS, etc.)
            return jsonify({
                'message': 'MFA code sent to your phone',
                'method': method,
                'sent': True  # Mock for now
            }), 200
        else:
            return jsonify({'error': 'Invalid MFA method'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/verify-mfa', methods=['POST'])
def verify_mfa():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')
    method = data.get('method', 'email')
    
    try:
        conn = sqlite3.connect('skulicheck.db')
        c = conn.cursor()
        
        # Get user
        c.execute('SELECT id FROM users WHERE email = ?', (email,))
        user = c.fetchone()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Verify MFA code
        c.execute('''SELECT id FROM verification_codes 
                     WHERE user_id = ? AND code = ? AND code_type = ? 
                     AND expires_at > ? AND used = FALSE''',
                  (user[0], code, f'mfa_{method}', datetime.now()))
        
        verification = c.fetchone()
        if not verification:
            return jsonify({'error': 'Invalid or expired MFA code'}), 400
        
        # Mark code as used
        c.execute('UPDATE verification_codes SET used = TRUE WHERE id = ?', (verification[0],))
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'MFA verification successful'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    
    try:
        conn = sqlite3.connect('skulicheck.db')
        c = conn.cursor()
        
        # Check if user exists
        c.execute('SELECT id FROM users WHERE email = ?', (email,))
        user = c.fetchone()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Generate reset code
        reset_code = generate_verification_code()
        expires_at = datetime.now() + timedelta(minutes=15)
        
        c.execute('''INSERT INTO verification_codes (user_id, code, code_type, expires_at)
                     VALUES (?, ?, ?, ?)''',
                  (user[0], reset_code, 'password_reset', expires_at))
        
        conn.commit()
        conn.close()
        
        # Send reset email
        email_sent = send_verification_email(email, reset_code, 'Password Reset')
        
        return jsonify({
            'message': 'Password reset code sent to your email',
            'sent': email_sent
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)

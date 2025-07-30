
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-app-domain.com/api' 
  : 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('session_token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication
  async register(userData) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async verifyEmail(userId, code) {
    return this.request('/verify-email', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, code }),
    });
  }

  async login(email, password) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.session_token) {
      localStorage.setItem('session_token', response.session_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.token = response.session_token;
    }

    return response;
  }

  async sendMFACode(email, method = 'email') {
    return this.request('/send-mfa-code', {
      method: 'POST',
      body: JSON.stringify({ email, method }),
    });
  }

  async verifyMFA(email, code, method = 'email') {
    return this.request('/verify-mfa', {
      method: 'POST',
      body: JSON.stringify({ email, code, method }),
    });
  }

  async resetPassword(email) {
    return this.request('/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async logout() {
    localStorage.removeItem('session_token');
    localStorage.removeItem('user');
    this.token = null;
  }

  // Utility methods
  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!this.token && !!this.getStoredUser();
  }
}

export default new ApiService();

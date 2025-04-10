import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/style.css';

const LoginForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
      const isEmail = identifier.includes('@');
      const body = isEmail
       ? { email: identifier, password }
       : { phone: identifier, password };

  try {
    const response = await fetch(`https://netflix-server-4a8a.onrender.com/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
      const data = await response.json();

      if (response.ok) {
        document.cookie = `token=${data.token}; max-age=3600; path=/`;
        sessionStorage.setItem('userId', data.userId);

        navigate('/WhosWatchingPage');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Server error. Please try again.');
    }
  };

  return (
    <div className="form-box">
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Email or phone number"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Sign In</button>

      <div className="forgot_password">Forgot Password?</div>

      <div className="extra-options">
        <label className="remember-me">
          <input type="checkbox" />
          <span className="checkmark"></span>
          Remember me
        </label>
        <p className="signup-link">
          New to Netflix? <span>Sign up now.</span>
        </p>
        <p className="captcha-text">
          This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#">Learn more.</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

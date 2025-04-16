import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/style.css';

const SignUpForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const isEmail = identifier.includes('@');

    const body = isEmail
      ? { email: identifier, password, role }
      : { phone: identifier, password, role };

    try {
      const response = await fetch('https://netflix-server-4a8a.onrender.com/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('userId', data.userId);
        console.log("✅ SIGNUP userId saved:", data.userId);

        navigate('/WhosWatchingPage');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Server error. Please try again.');
    }
  };

  return (
    <div className="form-box">
      <h2>Sign Up</h2>

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

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleSignUp}>Sign Up</button>

      <div className="extra-options">
        <p className="captcha-text">
          This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#">Learn more.</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

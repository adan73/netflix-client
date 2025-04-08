import React from 'react';
import '../CSS/style.css';

const LoginForm = () => {
  return (
    <div className="form-box">
      <h2>Sign In</h2>
      <input type="text" placeholder="Email or phone number" />
      <input type="password" placeholder="Password" />
      <button onClick={() => console.log("Sign up clicked")}>Sign Ip</button>
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
            This page is protected by Google reCAPTCHA to ensure your not a bot. <a href="#">Learn more.</a>
          </p>
        </div>
    </div>
  );
};

export default LoginForm;

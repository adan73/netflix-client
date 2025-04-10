import React from 'react';
import LoginForm from '../components/LogInForm';
import '../CSS/style.css';
import Footer from '../components/SignFooter';

const LoginPage = () => {
  return (
    <div className="login-page-wrapper">
         <img src="images/logo.png" alt="Netflix Logo" className="netflix-logo" />
        <div className="login-background">
          <LoginForm />
        </div>
        <Footer />
    </div>

  );
};

export default LoginPage;

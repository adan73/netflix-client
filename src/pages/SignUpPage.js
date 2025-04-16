import React from 'react';
import SignUpForm from '../components/SignUpForm';
import '../CSS/style.css';
import Footer from '../components/SignFooter';

const SignUpPage = () => {
  return (
    <div className="login-page-wrapper">
         <img src="images/logo.png" alt="Netflix Logo" className="netflix-logo" />
        <div className="login-background">
          <SignUpForm />
        </div>
        <Footer />
    </div>

  );
};

export default SignUpPage;

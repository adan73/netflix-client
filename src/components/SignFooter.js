import React from 'react';
import '../CSS/style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-contact">Questions? Call <a href="tel:1-844-505-2993">1-844-505-2993</a></p>

      <ul className="footer-links">
        <li>FAQ</li>
        <li>Help Center</li>
        <li>Netflix Shop</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Do Not Sell or Share My Personal Information</li>
        <li>Ad Choices</li>
      </ul>

      <div className="footer-lang">
        <button>
        <img src="/images/Vector.png" alt="vector" className="vector-logo" />
        English
        </button>
      </div>
    </footer>
  );
};

export default Footer;

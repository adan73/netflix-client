import React from 'react';
import '../CSS/style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-contact">Questions? Call <a href="tel:1-844-505-2993">1-844-505-2993</a></p>

      <ul className="footer-links">
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Netflix Shop</a></li>
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Cookie Preferences</a></li>
        <li><a href="#">Corporate Information</a></li>
        <li><a href="#">Do Not Sell or Share My Personal Information</a></li>
        <li><a href="#">Ad Choices</a></li>
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

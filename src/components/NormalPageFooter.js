import React from 'react';
import '../CSS/style.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const NormalPageFooter = () => {
  return (
    <footer className="normalPage-footer">

      <div className="footer-contact">
          <div className="footer-social-icons">
             <FaFacebookF />
             <FaInstagram />
             <FaTwitter />
             <FaYoutube />
          </div>
      </div>

      <ul className="footer-links">
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Center</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Netflix Shop</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
        <li>Do Not Sell or Share My Personal Information</li>
        <li>Ad Choices</li>
      </ul>

      <div className="footer-lang">
        <button>Service Code</button>
      </div>

      <div className="footer-bottom">© 1997 - 2025 Netflix, Inc.</div>
    </footer>
  );
};

export default NormalPageFooter;

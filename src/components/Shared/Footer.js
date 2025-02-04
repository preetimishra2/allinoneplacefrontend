import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-logo-section">
                    <h2 className="footer-logo">ALLINONEPLACE</h2>
                    <p>Your one-stop solution for everything.</p>
                </div>
                <div className="footer-links-section">
                    <ul className="footer-links">
                        <li><a href="/about" className="footer-link">About Us</a></li>
                        <li><a href="/contact" className="footer-link">Contact</a></li>
                        <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
                        <li><a href="/terms" className="footer-link">Terms of Service</a></li>
                    </ul>
                </div>
                <div className="footer-social-section">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Preeti Mishra. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

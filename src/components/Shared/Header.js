import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // state for menu toggle
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const adminStatus = localStorage.getItem('isAdmin') === 'true';
        const storedUserId = localStorage.getItem('_id');
        setIsLoggedIn(!!token);
        setIsAdmin(adminStatus);
        setUserId(storedUserId);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUserId(null);
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="header-container">
            <div className="logo">
                <Link to={isAdmin ? "/admin" : "/"} className="logo-text">
                    ALLINONEPLACE
                </Link>
            </div>
            {/* Hamburger Icon */}
            <div className="hamburger" onClick={toggleMenu}>
                <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
                <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
                <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
            </div>
            {/* Navigation Links */}
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                {!isAdmin && isLoggedIn && (
                    <li>
                        <button
                            className="profile-button"
                            onClick={() => navigate(`/userdashboard/${userId}`)}
                        >
                            Profile
                        </button>
                    </li>
                )}
                {!isAdmin && isLoggedIn && <li><Link to="/cart">Cart</Link></li>}
                {isAdmin && <li><Link to="/admin">Admin</Link></li>}
                {!isLoggedIn ? (
                    <li>
                        <Link to="/login" className="button-link">
                            Login/Register
                        </Link>
                    </li>
                ) : (
                    <li>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Header;

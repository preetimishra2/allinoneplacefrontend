import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../../ContextProvider';
import { FaRegUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa";
import logo from '../../assets/IMG_3955.PNG';
import logoMobile from '../../assets/logoMobile.png';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // state for menu toggle
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("")
    const { searchProduct, setSearchProduct, isMobile } = useContext(AppContext)

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const adminStatus = localStorage.getItem('isAdmin') === 'true';
        const storedUserId = localStorage.getItem('_id');
        setIsLoggedIn(!!token);
        setIsAdmin(adminStatus);
        setUserId(storedUserId);
        setSearchInput(searchProduct)

    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchProduct(searchInput)
        }, 300);
        return () => clearTimeout(timer);
    }, [searchInput])

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUserId(null);
        navigate('/login');
    };

    const searchProductHandler = event => {
        console.log(event.target.value)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="header-container">
            <div className="logo">
                <Link to={isAdmin ? "/admin" : "/"} className="logo-text">
                    {isMobile ? (
                        <img className='header-logo' src={logoMobile} />) : (
                        <img className='header-logo' src={logo} />)
                    }
                </Link>
            </div>
            {/* <div
                className={isMenuOpen ? 'search-div-hidden' : 'search-div'}
            > */}
                <input
                    type="text"
                    className={isMenuOpen ? 'search-input-hidden' : 'search-input'}
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                />
                {/* <FaSearch />
            </div> */}

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
                {!isAdmin && isLoggedIn && (
                    <li>
                        <Link to="/cart">
                            {isMenuOpen ? (
                                <React.Fragment>
                                    Cart
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <FaShoppingCart className="icon" /> Cart
                                </React.Fragment>
                            )}
                        </Link>
                    </li>)
                }
                {isAdmin && <li><Link to="/admin">Admin</Link></li>}

                {!isLoggedIn ? (
                    <li>
                        <Link to="/login" className="button-link" >
                            {isMenuOpen ? (
                                <React.Fragment>
                                     Login
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <FaRegUserCircle className="icon" /> Login
                                </React.Fragment>

                            )}
                        </Link>
                    </li>) : (
                    <li>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </li>
                )
                }



                {/* {!isLoggedIn ? (
                    <li>
                        <Link to="/login" className="button-link">
                            <FaRegUserCircle className="icon" />
                            Login
                        </Link>
                    </li>
                ) : (
                    <li>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </li>
                )} */}
            </ul>
        </nav>
    );
};

export default Header;

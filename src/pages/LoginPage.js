// pages/LoginPage.js
import React from 'react';
import Login from '../components/Shared/Login';
import Header from '../components/Shared/Header';
import Footer from '../components/Shared/Footer';
const LoginPage = () => {
    return (
        <React.Fragment>
            <Header/>
            <Login />
            <Footer/>
        </React.Fragment>
    );
};

export default LoginPage;
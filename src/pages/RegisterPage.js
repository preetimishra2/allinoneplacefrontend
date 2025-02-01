// pages/RegisterPage.js
import React from 'react';
import Register from '../components/Shared/Register';
import Footer from '../components/Shared/Footer';
import Header from '../components/Shared/Header';

const RegisterPage = () => {
    return (
        <React.Fragment>
            <Header/>
            <Register />
            <Footer/>
        </React.Fragment>
    );
};

export default RegisterPage;
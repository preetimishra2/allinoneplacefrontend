import React from 'react';
import ProductList from '../components/User/ProductList';
import Header from '../components/Shared/Header.js';
import Footer from '../components/Shared/Footer.js';
import Carousel from './Carousel.js';
const HomePage = () => {
    return (
        <React.Fragment>
            <Header/>
            <Carousel/>
            <ProductList />
            <Footer/>
        </React.Fragment>
    );
};

export default HomePage;
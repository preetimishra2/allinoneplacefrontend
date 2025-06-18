import React from 'react';
import './homepage.css';
import ProductList from '../components/User/ProductList';
import Header from '../components/Shared/Header.js';
import Footer from '../components/Shared/Footer.js';
import Carousel from './Carousel.js';
// import { CategoriesPanelForHomepage } from '../components/User/CategoriesPanelForHomepage.js';
import NavMenu from '../components/User/NavMenu.js';
const HomePage = () => {
    return (
        <React.Fragment>
            <Header />
            <div className='page-container' >
                {/* <CategoriesPanelForHomepage /> */}
                <Carousel />
                <NavMenu />
                <ProductList />
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default HomePage;
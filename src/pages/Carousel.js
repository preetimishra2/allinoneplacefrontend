import React, { useState } from 'react';
import './Carousel.css';
import banner1 from '../bannerimages/banner1.jpg';
import banner2 from '../bannerimages/banner2.jpg';

const Carousel = () => {
    const images = [banner2, banner1];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <div className="banner-carousel">
            <button className="banner-carousel-btn banner-btn-left" onClick={prevSlide}>
                &#10094;
            </button>
            <div
                className="banner-carousel-images"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="banner-carousel-image"
                    />
                ))}
            </div>
            <button className="banner-carousel-btn banner-btn-right" onClick={nextSlide}>
                &#10095;
            </button>
        </div>
    );
};

export default Carousel;

import React, { useState, useEffect } from 'react';
import './Carousel.css';
import banner1 from '../assets/bannerimages/banner1.jpg';
import banner2 from '../assets/bannerimages/banner2.jpg';

const Carousel = () => {
    const images = [banner1, banner2];
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup
    }, [images.length]);

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

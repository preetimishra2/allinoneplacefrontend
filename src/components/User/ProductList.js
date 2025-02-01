import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css'; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config"; 
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/products`)
            .then(response => {
                setProducts(response.data);
                setLoading(false); // Stop loading
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const showProductDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

    // Display loading screen
    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p className="loading-text">Fetching Products... Please Wait</p>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={search}
                onChange={handleSearch}
            />

            <div className="product-grid">
                {filteredProducts.length > 0 ? filteredProducts.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.images} alt={product.name} className="product-image" />
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">₹{product.price}</p>
                            <button 
                                className="view-details-btn" 
                                onClick={() => showProductDetails(product._id)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                )) : <p>No products found</p>}
            </div>
        </div>
    );
};

export default ProductList;

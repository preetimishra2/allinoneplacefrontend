import React, { useEffect, useState, useContext } from "react";
import "./ProductList.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import AppContext from "../../ContextProvider";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { CurrentlyShowingProducts  } = useContext(AppContext)
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CurrentlyShowingProducts: ", CurrentlyShowingProducts)
    setProducts(CurrentlyShowingProducts)
    setLoading(false)
    
  }, [CurrentlyShowingProducts]);
  
  useEffect(()=> {
    // setLoading(true)
    // setTimeout(() => {
      setProducts(CurrentlyShowingProducts)
      setLoading(false)
    // }, 500);
    
  },[CurrentlyShowingProducts])


  const showProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Display loading screen
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading Your Products. Test Versions take extra time, Please wait a little longer</p>
        {/* <p className="loading-text">Test versions are usually slow: just a few more moments! Please wait.</p> */}
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {/* <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={search}
        onChange={handleSearch}
      /> */}

      <div className="product-grid">
        {products.length > 0 ? products.map(product => (
          <div key={product._id} className="product-card" onClick={() => showProductDetails(product._id)}>
            <img src={`https://allinoneplacebackend.onrender.com${product.images[0]}`} alt={product.name} className="product-image" />
            {/* <img src={`${product.images[0]}`} alt={product.name} className="product-image" /> */}
            <div className="product-info" >
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
        )) : <p>No products found.</p>}
      </div>
    </div>
  );
};

export default ProductList;
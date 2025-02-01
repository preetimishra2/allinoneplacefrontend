import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import for managing cookies
import "./ProductDetails.css";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import { Carousel } from "react-responsive-carousel"; // Carousel library
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { API_BASE_URL } from "../../config";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) navigate("/login");
  }, [navigate]);

  // Fetch product details
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = () => {
    const cart = JSON.parse(Cookies.get("cart") || "[]");
    const existingProduct = cart.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({
        id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
    alert("Product added to cart!");
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="product-details-container">
        <div className="product-image-container">
          <Carousel autoPlay infiniteLoop showThumbs={false}>
            {product.images?.map((image, index) => (
              <div key={index}>
                <img 
                  src={`https://allinoneplacebackend.onrender.com/uploads/${image}`} 
                  alt={product.name} 
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="product-info">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">₹{product.price}</p>
          <p className="product-description">{product.description}</p>
          <div className="quantity-control">
            <button onClick={handleDecrease} className="quantity-btn">-</button>
            <span className="quantity-display">{quantity}</span>
            <button onClick={handleIncrease} className="quantity-btn">+</button>
          </div>
          <button onClick={addToCart} className="add-to-cart-btn">Add To Cart</button>
          <button className="back-btn" onClick={() => navigate("/")}>
            Back to Products
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

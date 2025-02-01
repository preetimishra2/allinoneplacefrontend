import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(Cookies.get("cart") || "[]");
        setCart(storedCart);
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        Cookies.set("cart", JSON.stringify(updatedCart));
    };

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        navigate("/checkout");
    };

    return (
        <React.Fragment>
            <Header />
            <div className="cart-container">
                <h2>Your Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-details">
                                    <p className="cart-name">{item.name}</p>
                                    <p className="cart-price">₹{item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
                <button className="checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                </button>
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default Cart;

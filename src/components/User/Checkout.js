import React, { useState, useEffect } from "react";
import "./Checkout.css";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import axios from "axios";

const Checkout = () => {
  const [user, setUser] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user details including addresses
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please log in to proceed.");
        return;
      }

      try {
        await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        if (response.data.addresses.length > 0) {
          setSelectedAddress(response.data.addresses[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post("/api/users/add-address", newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Address added successfully!");
      setUser(response.data);
      setSelectedAddress(newAddress);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("authToken");
    if (!selectedAddress) {
      alert("Please select or add an address to proceed.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/orders/checkout",
        {
          products: [], // Replace with actual products
          totalPrice: 100, // Replace with the actual total price
          paymentMethod,
          addressIndex: user.addresses.indexOf(selectedAddress),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to place the order.");
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="checkout-container">
        <h2>Checkout</h2>

        {user && (
          <>
            <h3>Choose an Address</h3>
            {user.addresses.map((address, index) => (
              <label key={index} className="address-item">
                <input
                  type="radio"
                  name="selectedAddress"
                  value={index}
                  checked={selectedAddress === address}
                  onChange={() => setSelectedAddress(address)}
                />
                <span>
                  {`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}
                </span>
              </label>
            ))}
          </>
        )}

        {!user && (
          <>
            <h3>Add New Address</h3>
            <form className="address-form">
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={newAddress.street}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={newAddress.city}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={newAddress.state}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={newAddress.postalCode}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={newAddress.country}
                onChange={handleAddressChange}
              />
              <button
                className="add-address-btn button-css"
                onClick={handleAddAddress}
                disabled={loading}
              >
                {loading ? (
                  <div className="loading-spinner">
                    <div />
                  </div>
                ) : (
                  "Add Address"
                )}
              </button>
            </form>
          </>
        )}

        {selectedAddress && (
          <>
            <h3>Payment Method</h3>
            <select
              className="payment-dropdown"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash-on-delivery">Cash on Delivery</option>
            </select>

            <button
              className="checkout-btn button-css"
              onClick={handleCheckout}
              disabled={!selectedAddress}
            >
              Place Order
            </button>
          </>
        )}
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default Checkout;

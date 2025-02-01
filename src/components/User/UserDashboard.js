import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import axios from "axios";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const userResponse = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);

        const ordersResponse = await axios.get("/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure orders are correctly accessed from the response
        if (Array.isArray(ordersResponse.data.orders)) {
          setOrders(ordersResponse.data.orders); // Set orders properly
        } else {
          console.error("Orders response is not an array:", ordersResponse.data);
          setOrders([]); // Default to empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("Failed to fetch dashboard data.");
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="dashboard-container">
        {user && (
          <div className="user-details">
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <h3>Addresses:</h3>
            <ul>
              {user.addresses.map((address, index) => (
                <li key={index}>
                  {address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="order-list">
          <h3>Your Orders</h3>
          <ul>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <li key={index}>
                  Order #{order._id} - Total: ${order.totalPrice} - Status: {order.status}
                </li>
              ))
            ) : (
              <li>No orders found.</li>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default UserDashboard;

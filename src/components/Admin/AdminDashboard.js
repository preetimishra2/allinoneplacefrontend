import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <section className="product-list-section">
        <h2>Product List</h2>
        <p>Manage and view all your products here.</p>
        <Link to="/admin/products" className="dashboard-btn">
          View Products
        </Link>
      </section>
      <section className="add-product-section">
        <h2>Add Product</h2>
        <p>Quickly add new products to your inventory.</p>
        <Link to="/admin/add-product" className="dashboard-btn">
          Add Product
        </Link>
      </section>
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProduct.css";
import { API_BASE_URL } from "../../config"; 

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [], // Assuming multiple images
    category: "",
    stock: 0,
  });

  useEffect(() => {
    // Use the admin route to fetch the product
    axios
      .get(`${API_BASE_URL}/api/admin/products/${id}`)
      .then((response) => {
        setFormData({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          images: response.data.images.map(img => `https://allinoneplacebackend.onrender.com${img}`), // Ensure correct image path
          category: response.data.category,
          stock: response.data.stock,
        });
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        alert("Product not found!");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_BASE_URL}/api/admin/products/${id}`, formData)
      .then(() => {
        alert("Product updated successfully");
        navigate("/admin/products");
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <form className="edit-product-form" onSubmit={handleSubmit}>
      <h2>Edit Product</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Image URLs:
        <div className="image-preview-container">
          {formData.images.map((image, index) => (
            <img key={index} src={image} alt={`Product ${index + 1}`} className="image-preview" />
          ))}
        </div>
      </label>
      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Vegetables and fruits">Vegetables and Fruits</option>
          <option value="Grocery">Grocery</option>
          <option value="Clothing">Clothing</option>
        </select>
      </label>

      <label>
        Stock:
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProduct;

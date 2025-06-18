import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import { API_BASE_URL } from "../../config";
import { CAT2, PRODUCT_CATEGORIES } from "../../CONSTANTS/Categories";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    category: "",
    subcategory:"",
    stock: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const uploadedImages = [];

    for (let file of files) {
      const imageFormData = new FormData();
      imageFormData.append("image", file);

      try {
        setLoading(true);
        const { data } = await axios.post(
          `${API_BASE_URL}/api/admin/upload`,
          imageFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // Ensure correct image path by adding the uploads directory prefix
        uploadedImages.push(data.url);
        console.log("Naveen data: ", data)
        // uploadedImages.push(`${data.url}`);
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }

    setFormData((prev) => ({ ...prev, images: uploadedImages }));
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/admin/products`, formData);
      setFormData({
        name: "",
        description: "",
        price: "",
        images: [],
        category: "",
        stock: "",
      });
      navigate("/admin");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="add-product-container">
        <form onSubmit={handleSubmit} className="add-product-form">
          <h2>Add New Product</h2>






          <div className="form-group">
            <label>Product Name</label>
            <input className='no-spinner'
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>







          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter product description"
            />
          </div>







          <div className="form-group">
            <label>Price (₹)</label>
            <input className='no-spinner'
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter product price"
            />
          </div>







          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>Select a category</option>
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>


            {formData.category && (<div className="form-group">
            <label>Sub Category</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              
            >
              <option value="" disabled hidden>Select a category</option>
              {formData.category &&
                // console.log(CAT2.filter(obj => obj.title === formData.category)[0]) &&
              CAT2.filter(obj => obj.title === formData.category)[0].subcategories
              .map((subcategory) => (
                <option key={subcategory.title} value={subcategory.title}>
                  {subcategory.title}
                </option>
              )
              )}
            </select>
          </div>)}







          <div className="form-group">
            <label>Stock</label>
            <input className='no-spinner'
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity (default: 0)"
            />
          </div>







          <div className="form-group">
            <label>Image Upload</label>
            <input className='no-spinner' type="file" onChange={handleImageUpload} multiple />
            {loading && <p>Uploading images...</p>}
            {formData.images.length > 0 && (
              <div className="image-previews">
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="image-preview"
                  />
                ))}
              </div>
            )}
          </div>







          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AddProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProduct.css";
import { API_BASE_URL } from "../../config";
import { CAT2 } from '../../CONSTANTS/Categories'

const EditProduct = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    subcategory: "",
    images: [], // Assuming multiple images
    category: "",
    stock: 0,
  });


  const { id } = useParams();
  const navigate = useNavigate();



  useEffect(() => {


    const IIFE = async () => {
      axios
        .get(`${API_BASE_URL}/api/admin/products/`)
      .then((response) => {
        const product = response.data.filter(item => item._id === id)[0]
        // console.log("product: ", product)
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.images,
          category: product.category,
          subcategory: product.subcategory ? product.subcategory : "",
          stock: product.stock,
        });
        console.log("product.subcategory: ", product.subcategory)
        toast.success("Product found!");
        setIsLoading(false);

      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        toast.error("Product not found!");
      })
    }
    IIFE()

  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("value: ", value)
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    axios
      .put(`${API_BASE_URL}/api/admin/products/${id}`, formData)
      .then(() => {
        toast.success("Product updated successfully");
        navigate("/admin/products");
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <form className="edit-product-form" onSubmit={handleSubmit}>
          <h2>Edit Product</h2>
          <div>Loading Your Product</div>
        </form>
      ) : (
        <form className="edit-product-form" onSubmit={handleSubmit}>
          <h2>Edit Product</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
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
              <img src={`https://allinoneplacebackend.onrender.com${formData.images[0]}`} alt={`Product`} className="image-preview" />
            </div>
          </label>


          <label>
            Category:
            <select name="category" value={formData.category} onChange={handleChange} required >
              <option value="" disabled hidden >Select a category</option>
              {formData.category && CAT2.map((category) => (
                <option key={category.title} value={category.title}>{category.title}</option>
              ))}
            </select>
          </label>


          {/* <label>
            Sub Category:
            <select name="subcategory" value={formData.subcategory} onChange={handleChange} required >
              <option value="" disabled hidden>Select a sub category</option>
              {formData.category &&
              // console.log("CAT2: ", CAT2) &&
              // console.log(formData.category) &&
              // console.log(CAT2.filter(obj => obj.title === formData.category)) &&
                CAT2.filter(obj => obj.title === formData.category)[0].subcategories
                  .map((subcategory, index) => (
                    <option key={subcategory.title} value={subcategory.title}>
                      {subcategory.title}
                    </option>
                  )
                  )}
            </select>
          </label> */}

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
      )}


    </React.Fragment>

  );
};

export default EditProduct;

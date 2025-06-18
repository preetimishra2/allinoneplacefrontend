// Admin/ProductList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import { API_BASE_URL } from "../../config";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  // const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/admin/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // const handleMouseMove = (e) => {
  //   setTimeout(() => {
  //     setTooltip({
  //       visible: true,
  //       x: e.clientX,
  //       y: e.clientY,
  //     });

  //   }, 1000);

  //   console.log("move", tooltip)
  // };

  // const handleMouseLeave = () => {
  //   console.log(tooltip)
  //   setTooltip((prev) => ({ ...prev, visible: false }));
  // };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`${API_BASE_URL}/api/admin/products/${id}`)
        .then(() =>
          setProducts(products.filter((product) => product._id !== id))
        )
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  // let underDev = <div
  //   className="under-dev-tooltip"
  //   style={{
  //     top: tooltip.y + 24,
  //     left: tooltip.x + 12,
  //   }}
  // >Under Development </div>

  return (
    <React.Fragment>
      <Header />
      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>₹{product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.subcategory ? product.subcategory : "none"}</td>
                <td>{product.stock}</td>
                <td>
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-product/${product._id}`)}
                      // disabled
                    >
                      Edit
                    </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                  {/* {tooltip.visible && underDev} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ProductList;

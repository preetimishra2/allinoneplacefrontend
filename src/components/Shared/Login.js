// Login Component
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { API_BASE_URL } from "../../config"; 

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, formData);
  
      // Extract token and user info from the response
      console.log(response.data)
      const { token, isAdmin } = response.data;
  
      // Store the token and isAdmin status in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("isAdmin", isAdmin); // Add this line to store admin status
      localStorage.setItem('_id', response.data.id);
  
      // Redirect based on user role
      if (isAdmin) {
        navigate("/admin"); // Redirect to admin page
      } else {
        navigate("/"); // Redirect to the regular user page
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.response?.data?.message || "Invalid email or password.");
    }
  };
  

  return (
    <React.Fragment>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="registration-option">
            Don’t have an account?{" "}
            <Link to="/register" className="register-link">
              Register here
            </Link>
          </p>
          <p className="registration-option">
            If you want you can register. Or else try these credentials for trail:
          </p>
          <p className="registration-option">
            Admin credentials : admin@gmail.com pwd:Admin1234@
          </p>
          <p className="registration-option">
            User credentials : test@gmail.com pwd:Test1234@
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;

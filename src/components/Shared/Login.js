// Login Component
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { API_BASE_URL } from "../../config"; 

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{

    const loginUser = async () => {
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
    }


    if (submitted) {
      loginUser()
    }
  },[submitted])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
      e.preventDefault()
      setSubmitted(true)
    }



  // const handleSubmit = async (e = null) => {
  //   if (e) {
  //     e.preventDefault()
  //   }
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/api/users/login`, formData);
  
  //     // Extract token and user info from the response
  //     console.log(response.data)
  //     const { token, isAdmin } = response.data;
  
  //     // Store the token and isAdmin status in localStorage
  //     localStorage.setItem("authToken", token);
  //     localStorage.setItem("isAdmin", isAdmin); // Add this line to store admin status
  //     localStorage.setItem('_id', response.data.id);
  
  //     // Redirect based on user role
  //     if (isAdmin) {
  //       navigate("/admin"); // Redirect to admin page
  //     } else {
  //       navigate("/"); // Redirect to the regular user page
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     setError(error.response?.data?.message || "Invalid email or password.");
  //   }
  // };

  const AdminLoginHandler = () => {
    setFormData({
      email: "admin@gmail.com",
      password : "Admin1234@"
    });
    setSubmitted(true)
  }

  const testLoginHandler = () => {
        setFormData({
      email: "test@gmail.com",
      password : "Test1234@"
    });
    setSubmitted(true)
  }

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
          <hr/>
          <div className = {"align-left"}>
          <h3>Shortcuts for HR:</h3>
          <p className="registration-option">
            Use these credentials to save your registration time:
          </p>
          <p className="registration-option">
            Login as Admin (for testing):
            <button onClick={AdminLoginHandler} className="login-button special-login-button ">
            Admin Login
          </button>
          </p>
          <p className="registration-option">
            Login as test user : 
            <button onClick={testLoginHandler} className="login-button special-login-button ">
            Test Login
          </button>
          </p>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;

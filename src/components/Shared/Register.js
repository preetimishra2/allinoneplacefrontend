// Register Component
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!validateEmail(formData.email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!validatePassword(formData.password)) {
      validationErrors.password =
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await axios.post("/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: formData.isAdmin,
      });

      alert("Registration successful!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors({ api: error.response?.data?.message || "Server error" });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>

        <label>
          Username:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
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
          {errors.password && <p className="error-text">{errors.password}</p>}
        </label>

        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
        </label>

        <label className="checkbox-container">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
          />
          Are you an admin?
        </label>

        <button type="submit" className="submit-button">
          Register
        </button>

        {errors.api && <p className="error-text">{errors.api}</p>}

        <p className="navigation-option">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Go back to Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

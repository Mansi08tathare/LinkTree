import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, login } from "../services/api";
import "../styles/signup.css";
import Logo from "../assets/loginFrame.png";
import SparkIcon from "../assets/sparkicon.png";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = "First name required*";
    if (!formData.lastname) errors.lastname = "Last name required*";
    if (!formData.email) errors.email = "Invalid Email*";
    
    if (!formData.password) {
      errors.password = "Please enter your password*";
    } else if (formData.password.length < 8) {
      errors.password = "The password must be at least 8 characters long*";
    } else if (!/[a-z]/.test(formData.password) || !/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) {
      errors.password = "Please choose a strong password that includes at least 1 lowercase and uppercase letter, a number, as well as a special character (!@#$%^&*)*";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "The password you entered does not match*";
    }
    
    if (!formData.agreeTerms) errors.agreeTerms = "You must agree to the Terms of Service and Privacy Policy";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
  
    setIsLoading(true);
    try {
      // Register the user
      const response = await register({
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
      });
  
      console.log("Signup API Response:", response);
  
      // Instead of checking response.ok (which doesn't exist in result), check the status
      if (!response || response.status !== 200) {
        throw new Error(response.message || "Registration failed");
      }
  
      // Automatically log in the user after successful signup
      const loginResponse = await login({
        email: formData.email,
        password: formData.password,
      });
  
      console.log("Login API Response:", loginResponse);
  
      if (!loginResponse || !loginResponse.token) {
        throw new Error(loginResponse.message || "Login failed");
      }
  
      alert("User created and logged in successfully!");
      navigate("/onboarding");
    } catch (error) {
      setError({ apiError: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="header-container">
          <div className="spark-logo">
            <img src={SparkIcon} alt="Spark Icon" className="spark-icon" />
            <span className="spark-text">Spark</span>
          </div>
          <div className="signin-link">
            <Link to="/login">Sign in instead</Link>
          </div>
        </div>
        <h1>Sign up to your Spark</h1>
        {error.apiError && <p className="error-message">{error.apiError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="name" placeholder="First name" value={formData.name} onChange={handleChange} required />
            {error.name && <p className="error-message">{error.name}</p>}
          </div>
          <div className="input-group">
            <input type="text" name="lastname" placeholder="Last name" value={formData.lastname} onChange={handleChange} required />
            {error.lastname && <p className="error-message">{error.lastname}</p>}
          </div>
          <div className="input-group">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            {error.email && <p className="error-message">{error.email}</p>}
          </div>
          <div className="input-group">
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            {error.password && <p className="error-message">{error.password}</p>}
          </div>
          <div className="input-group">
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            {error.confirmPassword && <p className="error-message">{error.confirmPassword}</p>}
          </div>
          <label className="checkbox-label">
            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
            <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
          </label>
          {error.agreeTerms && <p className="error-message">{error.agreeTerms}</p>}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create an account"}
          </button>
        </form>
        <p className="signin-text">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
      <div className="signup-image">
        <img src={Logo} alt="Signup Visual" />
      </div>
    </div>
  );
};

export default SignupPage;

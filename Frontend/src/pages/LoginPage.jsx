import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api"; 
import SparkIcon from "../assets/sparkicon.png";
import LoginImage from "../assets/loginFrame.png";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState(""); // Updated username -> email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await login({ email, password });

      console.log("Login API Response:", response);

      if (!response || !response.token) {
        throw new Error(response.message || "Invalid credentials");
      }

      // Store token in localStorage (or sessionStorage)
      localStorage.setItem("authToken", response.token);

      // Redirect to dashboard or homepage after successful login
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={SparkIcon} alt="Spark Logo" className="spark-logo" />
        <h1>Sign in to your Spark</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ?  <Eye size={18} />:<EyeOff size={18} /> }
            </button>
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <Link to="/forgot-password" className="forgot-password">
          Forgot password?
        </Link>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
      <div className="login-image">
        <img src={LoginImage} alt="Login Visual" className="responsive-image" />
      </div>
    </div>
  );
};

export default Login;

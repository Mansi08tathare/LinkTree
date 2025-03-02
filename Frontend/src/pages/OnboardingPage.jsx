import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import SparkLogo from "../assets/sparkicon.png"; 
import OnboardingImage from "../assets/loginFrame.png"; 
import "../styles/OnboardingPage.css"; 

const OnboardingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: "Business", icon: "🏢" },
    { name: "Creative", icon: "🎨" },
    { name: "Education", icon: "📚" },
    { name: "Entertainment", icon: "🎶" },
    { name: "Fashion & Beauty", icon: "💄" },
    { name: "Food & Beverage", icon: "🍕" },
    { name: "Government & Politics", icon: "🏛️" },
    { name: "Health & Wellness", icon: "🍎" },
    { name: "Non-Profit", icon: "💗" },
    { name: "Other", icon: "❓" },
    { name: "Tech", icon: "💻" },
    { name: "Travel & Tourism", icon: "✈️" },
  ];

  const handleContinue = () => {
    if (!selectedCategory) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-left">
        <img src={SparkLogo} alt="Spark Logo" className="logo" />

        <h1 className="onboarding-title">Tell us about yourself</h1>
        <p className="onboarding-subtitle">For a personalized Spark experience</p>

        <input type="text" className="onboarding-input" placeholder="Tell us your username" />

        <p className="onboarding-label">Select one category that best describes your Linktree:</p>

        <div className="category-container">
          {categories.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={`category-button ${selectedCategory === name ? "selected" : ""}`}
            >
              {icon} {name}
              {selectedCategory === name && <Check size={16} className="check-icon" />}
            </button>
          ))}
        </div>

        <button onClick={handleContinue} className="continue-button" disabled={!selectedCategory || isLoading}>
          {isLoading ? "Processing..." : "Continue"}
        </button>
      </div>

      <div className="onboarding-right">
        <img src={OnboardingImage} alt="Onboarding Background" className="onboarding-image" />
      </div>
    </div>
  );
};

export default OnboardingPage;

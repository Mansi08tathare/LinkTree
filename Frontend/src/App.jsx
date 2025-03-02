import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import LandingPage from "./pages/LandingPage"; // Import Landing Page
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OnboardingPage from "./pages/OnboardingPage";
import Dashboard from "./pages/Dashboard";
import Appearance from "./pages/AppearancePage";
import Analytics from "./pages/AnalyticsPage";
import Settings from "./pages/SettingsPage";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout"; // Import Layout

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("authToken") !== null
  );

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <>
      {/* Toast Container for Global Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Private Routes with Sidebar */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<Layout logout={logout} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appearance" element={<Appearance />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

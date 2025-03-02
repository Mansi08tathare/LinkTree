import { useState ,useRef,useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import SparkIcon from "../assets/sparkicon.png";
import LogoutIcon from "../assets/logout.png";
import LinksIcon from "../assets/links.png";
import AppearanceIcon from "../assets/appearance.png";
import AnalyticsIcon from "../assets/analytic.png";
import SettingsIcon from "../assets/settings.png";
import UserIcon from "../assets/user.png";

const Sidebar = ({ logout }) => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const logoutRef = useRef(null);
  
    // Close logout popover when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (logoutRef.current && !logoutRef.current.contains(event.target)) {
          setShowLogout(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <div className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <img src={SparkIcon} alt="Spark Logo" className="logo" />
          <span>Spark</span>
        </div>
  
        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="sidebar-link">
            <img src={LinksIcon} alt="Links" className="icon" /> Links
          </NavLink>
          <NavLink to="/appearance" className="sidebar-link">
            <img src={AppearanceIcon} alt="Appearance" className="icon" /> Appearance
          </NavLink>
          <NavLink to="/analytics" className="sidebar-link">
            <img src={AnalyticsIcon} alt="Analytics" className="icon" /> Analytics
          </NavLink>
          <NavLink to="/settings" className="sidebar-link">
            <img src={SettingsIcon} alt="Settings" className="icon" /> Settings
          </NavLink>
        </nav>
  
        {/* User Profile & Logout */}
        <div ref={logoutRef} className="sidebar-profile-container">
          <div
            className="sidebar-profile"
            onClick={() => setShowLogout(!showLogout)}
          >
            <img src={UserIcon} alt="User" className="user-icon" />
            <span className="username">Jenny Wilson</span>
          </div>
  
          {/* Logout Popover */}
          {showLogout && (
            <div className="logout-popup">
              <button onClick={() => { logout(); navigate("/login"); }}>
                <img src={LogoutIcon} alt="Logout" className="logout-icon" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Sidebar;
import "../styles/Layout.css";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = ({ logout }) => {
  return (
    <div className="layout">
      <Sidebar logout={logout} />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

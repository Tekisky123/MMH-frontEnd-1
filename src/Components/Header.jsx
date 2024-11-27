import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Assets/Styles/Header.css";
import logo from "../Assets/Images/logo-main.png";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "./Auth";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();

  // Function to handle toggling menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear local storage and update login status
    localStorage.clear();
    localStorage.setItem("login", false);
    navigate("/");
  };

  const confirmLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <input
          type="checkbox"
          id="menu-toggle"
          checked={isMenuOpen}
          onChange={() => setIsMenuOpen(!isMenuOpen)}
        />
        <label htmlFor="menu-toggle" className="hamburger-lines" onClick={toggleMenu}>
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </label>
        <ul className="menu-items">
          <li>
            <h1 className="logo-main">
              <img className="logo-main" src={logo} alt="Logo" />
            </h1>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              style={({ isActive }) => ({
                color: isActive ? "#a4c639" : "",
                backgroundColor: isActive ? "white" : "",
                textDecoration: isActive ? "" : "",
                padding: isActive ? "8px" : "",
                borderRadius: isActive ? "10px" : "",
              })}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              style={({ isActive }) => ({
                color: isActive ? "#a4c639" : "",
                backgroundColor: isActive ? "white" : "",
                textDecoration: isActive ? "" : "",
                padding: isActive ? "8px" : "",
                borderRadius: isActive ? "10px" : "",
              })}
              to="/yojna"
            >
              Yojna Details
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              style={({ isActive }) => ({
                color: isActive ? "#a4c639" : "",
                backgroundColor: isActive ? "white" : "",
                textDecoration: isActive ? "" : "",
                padding: isActive ? "8px" : "",
                borderRadius: isActive ? "10px" : "",
              })}
              to="/addPatient"
            >
              New Patient
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              style={({ isActive }) => ({
                color: isActive ? "#a4c639" : "",
                backgroundColor: isActive ? "white" : "",
                textDecoration: isActive ? "" : "",
                padding: isActive ? "8px" : "",
                borderRadius: isActive ? "10px" : "",
              })}
              to="/registered-patients"
            >
              Registered Patients
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              style={({ isActive }) => ({
                color: isActive ? "#a4c639" : "",
                backgroundColor: isActive ? "white" : "",
                textDecoration: isActive ? "" : "",
                padding: isActive ? "8px" : "",
                borderRadius: isActive ? "10px" : "",
              })}
              to="/user"
            >
              User
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              style={({ isActive }) => ({
                color: isActive ? "#a4c639" : "",
                backgroundColor: isActive ? "white" : "",
                textDecoration: isActive ? "" : "",
                padding: isActive ? "8px" : "",
                borderRadius: isActive ? "10px" : "",
              })}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              style={({ isActive }) => ({
                color: isActive ? "#a4c639" : "",
                backgroundColor: isActive ? "white" : "",
                textDecoration: isActive ? "" : "",
                padding: isActive ? "8px" : "",
                borderRadius: isActive ? "10px" : "",
              })}
              to="/reports"
            >
              Reports
            </NavLink>
          </li>
          <li className="logout-li">
            <Link onClick={confirmLogout}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

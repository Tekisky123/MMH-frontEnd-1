// Import NavLink from react-router-dom and styles from the Header.css file
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../Assets/Styles/Header.css";
import logo from "../../Assets/Images/logo-main.png";
import Modal from "react-modal";
import { useState } from "react";

// OperatorHeader component for navigation with operator-specific links
const OperatorHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("login", false);
    setShowLogoutModal(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    // Navigation bar with links to different pages
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
        
        {/* Menu items with NavLink for each page */}
        <ul className="menu-items">
          <li>
            <NavLink
              onClick={closeMenu}
              style={({ isActive }) => ({
                color: isActive ? "#a4c639" : "",
                backgroundColor: isActive ? "white" : "",
                textDecoration: isActive ? "" : "",
                // border: isActive ? "1px solid black" : "",
                padding: isActive ? "8px" : "", // Add padding style here
                borderRadius: isActive ? "10px" : "", // Add border radius style here
              })}
              to="/dashboard/:number"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <h1 className="logo-main">
              <img className="logo-main" src={logo} alt="" />
            </h1>
            <NavLink
              onClick={closeMenu}
              // Apply styles based on isActive state
              style={({ isActive }) => ({
                color: isActive ? "#a4c639" : "",
                backgroundColor: isActive ? "white" : "",
                textDecoration: isActive ? "" : "",
                // border: isActive ? "1px solid black" : "",
                padding: isActive ? "8px" : "", // Add padding style here
                borderRadius: isActive ? "10px" : "", // Add border radius style here
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
                // border: isActive ? "1px solid black" : "",
                padding: isActive ? "8px" : "", // Add padding style here
                borderRadius: isActive ? "10px" : "", // Add border radius style here
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
                // border: isActive ? "1px solid black" : "",
                padding: isActive ? "8px" : "", // Add padding style here
                borderRadius: isActive ? "10px" : "", // Add border radius style here
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
                // border: isActive ? "1px solid black" : "",
                padding: isActive ? "8px" : "", // Add padding style here
                borderRadius: isActive ? "10px" : "", // Add border radius style here
              })}
              to="/opRegistered-patients"
            >
              Registered Patients
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#a4c639" : "",
                backgroundColor: isActive ? "white" : "",
                textDecoration: isActive ? "" : "",
                // border: isActive ? "1px solid black" : "",
                padding: isActive ? "8px" : "", // Add padding style here
                borderRadius: isActive ? "10px" : "", // Add border radius style here
              })}
              to="networkHospitals"
            >
              Network Hospitals
            </NavLink>
          </li> */}

          <li className="logout-li">
            <Link onClick={openLogoutModal}>Logout</Link>
          </li>
        </ul>
        <h1 className="logo">{/* Logo image can be added here */}</h1>
      </div>
      <Modal
        isOpen={showLogoutModal}
        onRequestClose={closeLogoutModal}
        contentLabel="Contact Admin Modal"
        ariaHideApp={false}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-content">
          <p>Are you sure you want to Logout ?</p>
          <button className="btn-login" onClick={handleLogout}>
            Yes
          </button>
          <button
            style={{ margin: "10px 0px" }}
            className="btn-login"
            onClick={closeLogoutModal}
          >
            No
          </button>
        </div>
      </Modal>
    </nav>
  );
};

// Export the OperatorHeader component as the default export
export default OperatorHeader;

import { NavLink, useNavigate } from "react-router-dom";
import "../Assets/Styles/Header.css";
import logo from "../Assets/Images/logo-main.png"
import Modal from "react-modal";
import { useState } from "react";
import { useAuth } from "./Auth";

const Header = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const auth = useAuth()
  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = () => {

    // auth.logout();
    localStorage.clear();
    localStorage.setItem("login",false)
    setShowLogoutModal(false);
    navigate("/")
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <li>
          <h1 className="logo-main"><img className="logo-main" src={logo} alt="" /></h1>

            
            <NavLink
            
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
              style={({ isActive }) => ({
                color: isActive ? "#a4c639" : "",
                backgroundColor: isActive ? "white" : "",
                textDecoration: isActive ? "" : "",
                // border: isActive ? "1px solid black" : "",
                padding: isActive ? "8px" : "", // Add padding style here
                borderRadius: isActive ? "10px" : "", // Add border radius style here
              })}
              to="/registered-patients"
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
              to="/networkHospitals"
            >
              Network Hospitals
            </NavLink>
          </li> */}
          <li>
            <NavLink
             style={({ isActive }) => ({
              color: isActive ? "#a4c639" : "",
              backgroundColor: isActive ? "white" : "",
              textDecoration: isActive ? "" : "",
              // border: isActive ? "1px solid black" : "",
              padding: isActive ? "8px" : "", // Add padding style here
              borderRadius: isActive ? "10px" : "", // Add border radius style here
            })}
              to="/user"
            >
              User
            </NavLink>
          </li>
          <li>
            <NavLink
             style={({ isActive }) => ({
              color: isActive ? "#a4c639" : "",
              backgroundColor: isActive ? "white" : "",
              textDecoration: isActive ? "" : "",
              // border: isActive ? "1px solid black" : "",
              padding: isActive ? "8px" : "", // Add padding style here
              borderRadius: isActive ? "10px" : "", // Add border radius style here
            })}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
             style={({ isActive }) => ({
              color: isActive ? "#a4c639" : "",
              backgroundColor: isActive ? "white" : "",
              textDecoration: isActive ? "" : "",
              // border: isActive ? "1px solid black" : "",
              padding: isActive ? "8px" : "", // Add padding style here
              borderRadius: isActive ? "10px" : "", // Add border radius style here
            })}
              to="/reports"
            >
              Reports
            </NavLink>
          </li>
          <li className="logout-li">
            <a onClick={openLogoutModal}>
              Logout
            </a>
          </li>

   
        </ul>
        <h1 className="logo">{/* <img src={logo} alt="" /> */}</h1>
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
                    <p>
                       Are you sure you want to Logout ?
                    </p>
                    <button
                      className="btn-login"
                      onClick={handleLogout}
                    >
                      Yes
                    </button>
                    <button
                    style={{margin:"10px 0px"}}
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

export default Header;

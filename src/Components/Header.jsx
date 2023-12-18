import { NavLink } from "react-router-dom";
import "../Assets/Styles/Header.css";
import logo from "../Assets/Images/logo-main.png"

const Header = () => {
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
              DashBoard
            </NavLink>
          </li>
        </ul>
        <h1 className="logo">{/* <img src={logo} alt="" /> */}</h1>
      </div>
    </nav>
  );
};

export default Header;

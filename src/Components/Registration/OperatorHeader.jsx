// Import NavLink from react-router-dom and styles from the Header.css file
import { NavLink } from "react-router-dom";
import "../../Assets/Styles/Header.css";

// OperatorHeader component for navigation with operator-specific links
const OperatorHeader = () => {
  return (
    // Navigation bar with links to different pages
    <nav className="navbar">
      <div className="navbar-container container">
        <input type="checkbox" name="" id="" />
        {/* Hamburger menu lines for mobile view */}
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        {/* Menu items with NavLink for each page */}
        <ul className="menu-items">
          <li>
            <NavLink
              // Apply styles based on isActive state
              style={({ isActive }) =>
                isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {}
              }
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {}
              }
              to="/yojna"
            >
              Yojna Details
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {}
              }
              to="/addPatient"
            >
              New Patient
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {}
              }
              to="/registered-patients"
            >
              Registered Patients
            </NavLink>
          </li>
        </ul>
        <h1 className="logo">
          {/* Logo image can be added here */}
        </h1>
      </div>
    </nav>
  );
};

// Export the OperatorHeader component as the default export
export default OperatorHeader;

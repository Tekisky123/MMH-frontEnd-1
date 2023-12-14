import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Assets/Styles/Header.css";

const Header = () => {
  // State for controlling mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);

  // State for tracking the active tab
  const [activeTab, setActiveTab] = useState("home");

  // Toggle function to open/close mobile menu
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle tab clicks, updating active tab and closing the mobile menu
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false); // Close the mobile menu after clicking a tab
  };
  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="logo"></div>
      <ul className={`nav-list ${isOpen ? "open" : ""}`}>
        {/* Navigation tab for "Home" */}
        <li
          className={activeTab === "home" ? "active" : ""}
          style={{
            color: activeTab === "home" ? "black" : "inherit",
            textDecoration: activeTab === "home" ? "underline" : "black",
          }}
        >
          <Link onClick={() => handleTabClick("home")} to="/home">
            Home
          </Link>
        </li>

        {/* Repeat the following structure for other navigation tabs */}

        {/* Navigation tab for "Yojna Details" */}
        <li
          className={activeTab === "yojna-details" ? "active" : ""}
          style={{
            color: activeTab === "yojna-details" ? "black" : "inherit",
            textDecoration:
              activeTab === "yojna-details" ? "underline" : "none",
          }}
        >
          <Link
            onClick={() => handleTabClick("yojna-details")}
            to="/yojna-details"
          >
            Yojna Details
          </Link>
        </li>

        {/* Navigation tab for "New Patient" */}
        <li
          className={activeTab === "addPatient" ? "active" : ""}
          style={{
            color: activeTab === "addPatient" ? "black" : "inherit",
            textDecoration: activeTab === "addPatient" ? "underline" : "none",
          }}
        >
          <Link onClick={() => handleTabClick("addPatient")} to="/addPatient">
            New Patient
          </Link>
        </li>

        <li
          className={activeTab === "registered-patients" ? "active" : ""}
          style={{
            color: activeTab === "registered-patients" ? "black" : "inherit",
            textDecoration:
              activeTab === "registered-patients" ? "underline" : "none",
          }}
        >
          <Link
          
            onClick={() => handleTabClick("registered-patients")}
            to="/registered-patients"
          >
            Registered Patients
          </Link>
        </li>

        <li
          className={activeTab === "User" ? "active" : ""}
          style={{
            color: activeTab === "User" ? "black" : "inherit",
            textDecoration: activeTab === "User" ? "underline" : "none",
          }}
        >
          <Link onClick={() => handleTabClick("User")} to="/User">
            User
          </Link>
        </li>

        <li
          className={activeTab === "dashboard" ? "active" : ""}
          style={{
            color: activeTab === "dashboard" ? "black" : "inherit",
            textDecoration: activeTab === "dashboard" ? "underline" : "none",
          }}
        >
          <Link onClick={() => handleTabClick("dashboard")} to="/dashboard">
            DashBoard
          </Link>
        </li>
      </ul>
      {/* Burger menu icon for mobile navigation */}
      <div className="burger-menu" onClick={handleToggle}>
        &#9776;
      </div>
    </nav>
  );
};

export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Assets/Styles/Header.css";
import Home from "./Pages/Home";
// import Dashboard from "./Pages/Dashboard";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false); // Close the mobile menu after clicking a tab
  };
  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="logo"></div>
      <ul className={`nav-list ${isOpen ? "open" : ""}`}>
        <li
          className={activeTab === "home" ? "active" : ""}
          style={{
            color: activeTab === "home" ? "#4caf50" : "inherit",
            textDecoration: activeTab === "home" ? "underline" : "none",
          }}
        >
          <Link onClick={() => handleTabClick("home")} to="/home">
            Home
          </Link>
        </li>
        <li className={activeTab === "yojna" ? "active" : ""}>
          <Link onClick={() => handleTabClick("yojna")} href="#yojna">
            Yojna Details
          </Link>
        </li>
        <li className={activeTab === "new-patient" ? "active" : ""}>
          <Link
            onClick={() => handleTabClick("new-patient")}
            href="#new-patient"
          >
            New Patient
          </Link>
        </li>
        <li className={activeTab === "register-patient" ? "active" : ""}>
          <Link
            onClick={() => handleTabClick("register-patient")}
            to="/register"
          >
            Registered Patients
          </Link>
        </li>
        <li className={activeTab === "user" ? "active" : ""}>
          <Link onClick={() => handleTabClick("user")} href="#user">
            User
          </Link>
        </li>
        <li className={activeTab === "dashboard" ? "active" : ""}>
          <Link onClick={() => handleTabClick("dashboard")} to="/dashboard">
            Dashboard
          </Link>
        </li>
      </ul>
      <div className="burger-menu" onClick={handleToggle}>
        &#9776;
      </div>
    </nav>
  );
};

export default Header;

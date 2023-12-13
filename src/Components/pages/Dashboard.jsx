import React, { useState } from "react";
import "../../Assets/Styles/Dashboard.css";
import Home from "./Home";
import CreateUser from "./CreateUser";
import RegisterPatient from "./RegisterPatient";
import PatientDetails from "./patientInquiry/PatientDetails.jsx"

const Dashboard = () => {
  const patientData = {
    id: 1,
    name: "John Doe",
    gender:"male",
    age:20
    // other properties
  };

  const [activeTab, setActiveTab] = useState("home");

  const opentab = (tabname) => {
    setActiveTab(tabname);
  };
  return (
    <div>
      <div className="container">
        <div className="tab-titles">
          <p
            className={`tab-links ${activeTab === "home" ? "active-link" : ""}`}
            onClick={() => opentab("home")}
          >
            Home
          </p>
          <p
            className={`tab-links ${
              activeTab === "Yojna-Details" ? "active-link" : ""
            }`}
            onClick={() => opentab("Yojna-Details")}
          >
            Yojna Details
          </p>
          <p
            className={`tab-links ${
              activeTab === "New-Patient" ? "active-link" : ""
            }`}
            onClick={() => opentab("New-Patient")}
          >
            New Patient
          </p>
          <p
            className={`tab-links ${
              activeTab === "Register-Patient" ? "active-link" : ""
            }`}
            onClick={() => opentab("Register-Patient")}
          >
            Register Patient
          </p>
          <p
            className={`tab-links ${activeTab === "User" ? "active-link" : ""}`}
            onClick={() => opentab("User")}
          >
            User
          </p>
          <p
            className={`tab-links ${
              activeTab === "Dashboard" ? "active-link" : ""
            }`}
            onClick={() => opentab("Dashboard")}
          >
            Dashboard
          </p>
        </div>
        <div
          className={`tab-contents ${
            activeTab === "New-Patient" ? "active-tab" : ""
          }`}
          id="New-Patient"
        >
    
        </div>

        <div
          className={`tab-contents ${activeTab === "home" ? "active-tab" : ""}`}
          id="home"
        >
          <Home />
        </div>
        <div
          className={`tab-contents ${
            activeTab === "Yojna-Details" ? "active-tab" : ""
          }`}
          id="Yojna-Details"
        >
          <p>Yojna-Details</p>
        </div>
        <div
          className={`tab-contents ${
            activeTab === "New-Patient" ? "active-tab" : ""
          }`}
          id="New-Patient"
        >
          <PatientDetails/>
        </div>
        <div
          className={`tab-contents ${
            activeTab === "Register-Patient" ? "active-tab" : ""
          }`}
          id="Register-Patient"
        >
          <RegisterPatient patient={patientData} />
        </div>
        <div
          className={`tab-contents ${activeTab === "User" ? "active-tab" : ""}`}
          id="User"
        >
          <CreateUser />
        </div>
        <div
          className={`tab-contents ${
            activeTab === "Dashboard" ? "active-tab" : ""
          }`}
          id="Dashboard"
        >
          <p>Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

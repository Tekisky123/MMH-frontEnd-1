import React, { useState } from "react";
import "../../Assets/Styles/Dashboard.css";
import Home from "../pages/Home";
import CreateUser from "../pages/CreateUser";
import RegisterPatient from "../pages/RegisterPatient";

const Dashboard = () => {
  const patientData = {
    id: 1,
    name: "John Doe",
    gender:"male",
    age:20

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
          <form className="form-div">
            <h2>
              Please fill out all information, so that we may better server you.
            </h2>

            <div className="form-div">
              <label for="full_name">Patient Full Name</label>
              <input
                type="text"
                className="form-input"
                id="full_name"
                placeholder="First Name"
                required
                autofocus
                autocomplete="on"
              />
              <span className="help-block"></span>
            </div>

            <div className="form-div">
              <label for="phone_number">Patient Phone Number</label>
              <input
                type="tel"
                className="form-input"
                id="phone_number"
                placeholder="+1-416-967-1111"
              />
              <span className="help-block"></span>
            </div>

            <div className="form-div">
              <label for="gender">Patient Gender</label>
              <select id="gender" name="gender" required className="form-input">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <span className="help-block"></span>
            </div>

            <div className="form-div">
              <label for="age">Age</label>
              <input
                type="number"
                className="form-input"
                id="age"
                placeholder="Age"
                min="1"
                max="110"
                required
              />
              <span className="help-block"></span>
            </div>

            <div className="form-div">
              <label for="state">State</label>
              <select id="state" name="state" required className="form-input">
                <option value="Male">Male</option>
              </select>
              <span className="help-block"></span>
            </div>

            <div className="form-div">
              <label for="Address">Patient Full Address</label>
              <input
                type="text"
                className="form-input"
                id="Address"
                placeholder="Address"
                required
              />
              <span className="help-block"></span>
            </div>

            <button className="full-width-btn" type="submit">
              Confirm Appointment
            </button>
          </form>
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
          <p>New-Patient</p>
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

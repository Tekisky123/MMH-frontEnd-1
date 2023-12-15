import {  NavLink } from "react-router-dom";
import "../../Assets/Styles/Header.css";
// import axios from "axios";
// import { useEffect, useState } from "react";

const OperatorHeader = () => {
  // const [typeData,setTypeData ] = useState()
  // useEffect(() => {
  //   console.log("hello");
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post("http://13.126.14.109:4000/user/login");
  //       console.log("hi", response.data.userType);
  //       setTypeData(response.data.userType);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       // Handle the error, show a message to the user, or retry the request.
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  
 
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
            <NavLink
              style={({ isActive }) => {
                return isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {};
              }}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {};
              }}
              to="/yojna"
            >
              Yojna Details
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {};
              }}
              to="/addPatient"
            >
              New Patient
            </NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => {
                return isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {};
              }}
              to="/registered-patients">Registered Patients</NavLink>
          </li>
         
         
        </ul>
        <h1 className="logo">
          {/* <img src={logo} alt="" /> */}
        </h1>
      </div>
    </nav>
  );
};

export default OperatorHeader;

// Dashboard.js

import React, { useState, useEffect } from "react";
import "../../Components/dashboard/Dashboard.css";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";


const OperatorDashboard = () => {

  const {number} =useParams()

  const [data, setData] = useState({
    totalAmountSaved: 0,
    monthlyAmountSaved: 0,
    PendingCasesMoreThan5Days: 0,
    totalClosedCases: 0,
    totalNumberOfApproach: 0,
    totalNumberOfMonthApproach: 0,
    totalClosedCasesInMonth: 0,

    registerPatients:0,
    documentUploaded:0,
    schemeAndHospitalSelected:0,
  });

  // useEffect(() => {
  //   // Dummy API URL (Replace this with your actual API endpoint)
  //   const apiUrl = "http://13.126.14.109:4000/mmh/dashboard";

  //   // Fetch data from the API
  //   fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       // Update state with API data
  //       setData({
  //         totalAmountSaved: json.totalAmountSaved,
  //         monthAmountSaved: json.monthAmountSaved,
  //         PendingCasesMoreThan5Days: json.PendingCasesMoreThan5Days,
  //         totalClosedCases: json.totalClosedCases,
  //         totalClosedCasesInMonth: json.totalClosedCasesInMonth,
  //         totalNumberOfApproach: json.totalNumberOfApproach,
  //         totalNumberOfMonthApproach: json.totalNumberOfMonthApproach,
  //       });
  //     })
  //     .catch((error) => console.error("Error fetching data: ", error));
  // }, []); // Empty dependency array to run effect only once on mount


  useEffect(() => {
    getOperatorData()
  }, [])
  

  const getOperatorData = async (e) => {


  try {
    const mobilenumber = localStorage.getItem("mobileNumber");
    const url = "http://13.126.14.109:4000/mmh/dashboard/operator?phoneNumber=";
    const response = await axios.get(url + mobilenumber);

    console.log("response: ", response.data); 

    if (response.status === 200 || response.data.success) {
      console.log("response details: ", response.data.details);

      setData({
        totalAmountSaved: response.data.details.totalAmountSaved,
        monthlyAmountSaved: response.data.details.monthAmountSaved,
        PendingCasesMoreThan5Days: response.data.details.pendingPatientsCount,
        totalClosedCases: response.data.details.totalClosedCases,
        totalClosedCasesInMonth: response.data.details.totalClosedCasesInMonth,
        totalNumberOfApproach: response.data.details.totalNumberOfApproach,
        totalNumberOfMonthApproach: response.data.details.totalNumberOfMonthApproach,

        registerPatients: response.data.details.registerPatients,
        documentUploaded: response.data.details.uploadDocumentsCount,
        schemeAndHospitalSelected: response.data.details.hospitalAndSchemeDetails,
      });
    }
  } catch (error) {
    console.error("API call error:", error.message);
  }
};


  return (
    <div className="dashbord-main">
      {/* First Row */}
      {/* <div className="dashboard-card amount">
        <h1 className="monthly-amount-heading ">Monthly Amount Saved</h1>
        <p className="OPcard-value">₹ {data.monthlyAmountSaved ? data.monthlyAmountSaved : 0}</p>
      </div> */}

      {/* <div className="dashboard-card total-closed-cases cards">
        <h1 className="total-closed-cases-heading ">Total Closed Cases In This Month</h1>
        <p className="OPcard-value">{data.totalClosedCasesInMonth ? data.totalClosedCasesInMonth : 0}</p>
      </div> */}

      {/* <div className="dashboard-card cards">
        <h1 className="total-approach-heading ">Total Number of Approaches In This Month</h1>
        <p className="OPcard-value">{data.totalNumberOfMonthApproach ? data.totalNumberOfMonthApproach : 0}</p>
      </div> */}

      {/* <div className="dashboard-card pending-cases">
        <h1 className="pending-cases-heading ">Pending Cases For More Than 5 Days</h1>
        <p className="OPcard-value">{data.PendingCasesMoreThan5Days ? data.PendingCasesMoreThan5Days : 0}</p>
      </div> */}

      {/* Second Row */}
      {/* <div className="dashboard-big-card">
        <div className="dashboard-card amount">
          <h1 className="total-amount-heading ">Total Amount Saved</h1>
          <p className="OPcard-value">₹ {data.totalAmountSaved ? data.totalAmountSaved : 0}</p>
        </div>

        <div className="dashboard-card cards">
          <h1 className="total-closed-cases-heading">Total Closed Cases</h1>
          <p className="OPcard-value">{data.totalClosedCases ? data.totalClosedCases : 0}</p>
        </div>

        <div className="dashboard-card cards">
          <h1 className="total-approach-heading">Total Number of Approaches</h1>
          <p className="OPcard-value">{data.totalNumberOfApproach ? data.totalNumberOfApproach : 0}</p>
        </div>
      </div> */}

       <div className="operaterCards">

       {/* <div className="dashboard-card cards">
        <h1 className="total-approach-heading ">Register Patients</h1>
        <NavLink to="/registered-patients" className="OPcard-value">{data.registerPatients ? data.registerPatients : 0}</NavLink>
      </div> */}

      <div className="dashboard-card cards">
        <h1 className="total-approach-heading ">Document Uploaded</h1>
        <NavLink to="/registered-patients/documentsUploaded" className="OPcard-value">{data.documentUploaded ? data.documentUploaded : 0}</NavLink>
      </div>

      <div className="dashboard-card cards">
        <h1 className="total-approach-heading ">Scheme and Hospital Selected</h1>
        <NavLink to="/registered-patients/scheme&hospital" className="OPcard-value">{data.schemeAndHospitalSelected ? data.schemeAndHospitalSelected : 0}</NavLink>
      </div>
            <div className="dashboard-card pending-cases">
        <h1 className="pending-cases-heading ">Pending Cases For More Than 5 Days</h1>
        <NavLink to="/registered-patients/pending" className="card-pending-value">{data.PendingCasesMoreThan5Days ? data.PendingCasesMoreThan5Days : 0}</NavLink>
      </div>
       </div>

    </div>
  );
};

export default OperatorDashboard;

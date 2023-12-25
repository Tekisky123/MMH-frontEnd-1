// Dashboard.js

import React, { useState, useEffect } from "react";
import "../../Components/dashboard/Dashboard.css";


const Dashboard = () => {
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

  useEffect(() => {
    // Dummy API URL (Replace this with your actual API endpoint)
    const apiUrl = "http://13.126.14.109:4000/mmh/dashboard";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        // Update state with API data
        setData({
          totalAmountSaved: json.totalAmountSaved,
          monthlyAmountSaved: json.monthAmountSaved,
          PendingCasesMoreThan5Days: json.PendingCasesMoreThan5Days,
          totalClosedCases: json.totalClosedCases,
          totalClosedCasesInMonth: json.totalClosedCasesInMonth,
          totalNumberOfApproach: json.totalNumberOfApproach,
          totalNumberOfMonthApproach: json.totalNumberOfMonthApproach,

          registerPatients: json.registerPatients,
        documentUploaded: json.uploadDocumentsCount,
        schemeAndHospitalSelected: json.hospitalAndSchemeDetails,
        });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div className="dashbord-main">
      {/* First Row */}
      <div className="dashboard-card amount">
        <h1 className="monthly-amount-heading ">Monthly Amount Saved</h1>
        <p className="card-value">₹ {data.monthlyAmountSaved}</p>
      </div>

      <div className="dashboard-card total-closed-cases cards">
        <h1 className="total-closed-cases-heading ">Total Closed Cases In This Month</h1>
        <p className="card-value">{data.totalClosedCasesInMonth}</p>
      </div>

      <div className="dashboard-card cards">
        <h1 className="total-approach-heading ">Total Number of Approaches In This Month</h1>
        <p className="card-value">{data.totalNumberOfMonthApproach}</p>
      </div>

      <div className="dashboard-card pending-cases">
        <h1 className="pending-cases-heading ">Pending Cases For More Than 5 Days</h1>
        <p className="card-value">{data.PendingCasesMoreThan5Days}</p>
      </div>

      {/* Second Row */}
      <div className="dashboard-big-card">
        <div className="dashboard-card amount">
          <h1 className="total-amount-heading ">Total Amount Saved</h1>
          <p className="card-value">₹ {data.totalAmountSaved}</p>
        </div>

        <div className="dashboard-card cards">
          <h1 className="total-closed-cases-heading">Total Closed Cases</h1>
          <p className="card-value">{data.totalClosedCases}</p>
        </div>

        <div className="dashboard-card cards">
          <h1 className="total-approach-heading">Total Number of Approaches</h1>
          <p className="card-value">{data.totalNumberOfApproach}</p>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"space-around" , width:"100%"}}>
       <div className="dashboard-card cards">
        <h1 className="total-approach-heading ">Register Patients</h1>
        <p className="card-value">{data.registerPatients ? data.registerPatients : 0}</p>
      </div>

      <div className="dashboard-card cards">
        <h1 className="total-approach-heading ">Document Uploaded</h1>
        <p className="card-value">{data.documentUploaded ? data.documentUploaded : 0}</p>
      </div>

      <div className="dashboard-card cards">
        <h1 className="total-approach-heading ">Sceme and Hospital Selected</h1>
        <p className="card-value">{data.schemeAndHospitalSelected ? data.schemeAndHospitalSelected : 0}</p>
      </div>
       </div>
    </div>
  );
};

export default Dashboard;

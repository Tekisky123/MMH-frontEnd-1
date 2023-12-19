// Dashboard.js

import React, { useState, useEffect } from "react";
import "../../Components/dashboard/Dashboard.css";


const Dashboard = () => {
  const [data, setData] = useState({
    totalAmountSaved: 0,
    monthlyAmountSaved: 0,
    pendingCases: 0,
    totalClosedCases: 0,
    totalApproach: 0,
    totalMonthApproach: 0,
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
          monthlyAmountSaved: json.monthlyAmountSaved,
          pendingCases: json.pendingCases,
          totalClosedCases: json.totalClosedCases,
          totalApproach: json.totalApproach,
          totalMonthApproach: json.totalMonthApproach,
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
        <h1 className="total-closed-cases-heading ">Total Closed Cases In Month</h1>
        <p className="card-value">{data.totalClosedCases}</p>
      </div>

      <div className="dashboard-card cards">
        <h1 className="total-approach-heading ">Total Number of Approaches In Month</h1>
        <p className="card-value">{data.totalApproach}</p>
      </div>

      <div className="dashboard-card pending-cases">
        <h1 className="pending-cases-heading ">Pending cases for more than 5 days</h1>
        <p className="card-value">{data.pendingCases}</p>
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
          <p className="card-value">{data.totalApproach}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

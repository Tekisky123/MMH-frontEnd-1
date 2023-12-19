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
          monthAmountSaved: json.monthAmountSaved,
          PendingCasesMoreThan5Days: json.PendingCasesMoreThan5Days,
          totalClosedCasesInMonth: json.totalClosedCasesInMonth,
          totalClosedCases: json.totalClosedCases,
          totalNumberOfApproach: json.totalNumberOfApproach,
          totalNumberOfMonthApproach: json.totalNumberOfMonthApproach,
        });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div className="dashbord-main">
      <div className="dashboard-card1">
        <h1 className="total-amount-heading">Total Amount Saved</h1>
        <p className="card-value">{data.totalAmountSaved}</p>
      </div>

      <div className="dashboard-card1">
        <h1 className="total-amount-heading">Monthly Amount Saved</h1>
        <p className="card-value">{data.monthAmountSaved}</p>
      </div>

      <div className="dashboard-card1">
        <h1 className="Pending-case">Pending case for more than 5 days</h1>
        <p className="card-value">{data.PendingCasesMoreThan5Days}</p>
      </div>
      <div className="dashboard-card1">
        <h1 className="Pending-case">total Closed Cases InMonth</h1>
        <p className="card-value">{data.totalClosedCasesInMonth}</p>
      </div>

      <div className="dashbord-data">
        <div className="dashboard-card">
          <h3 className="total-closed-cases">Total Closed Cases</h3>
          <p className="card-value">{data.totalClosedCases}</p>
        </div>

        <div className="dashboard-card">
          <h3 className="total-number-of-approach">Total Number of Approaches</h3>
          <p className="card-value">{data.totalNumberOfApproach}</p>
        </div>

        <div className="dashboard-card">
          <h3 className="total-number-of-month-approach">
            Total Number of Month Approaches
          </h3>
          <p className="card-value">{data.totalNumberOfMonthApproach}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

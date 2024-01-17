// Dashboard.js

import React, { useState, useEffect } from "react";
import "../../Components/dashboard/Dashboard.css";
import * as XLSX from "xlsx";
import axios from "axios";

const Dashboard = () => {
  function formatAmount(amount) {
    if (amount === undefined || amount === null) {
      return "0"; // or any default value you prefer for undefined/null amounts
    }

    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(1) + "B";
    } else if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + "M";
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + "K";
    } else {
      return amount.toString();
    }
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState({
    totalAmountSaved: 0,
    monthlyAmountSaved: 0,
    PendingCasesMoreThan5Days: 0,
    totalClosedCases: 0,
    totalNumberOfApproach: 0,
    totalNumberOfMonthApproach: 0,
    totalClosedCasesInMonth: 0,

    registerPatients: 0,
    documentUploaded: 0,
    schemeAndHospitalSelected: 0,
  });

  // Function to filter data based on date range
  const filterDataByDateRange = (data, startDate, endDate) => {
    if (!startDate || !endDate) {
      return data;
    }

    return data.filter((entry) => {
      const entryDate = new Date(entry.registeredDate);
      return entryDate >= startDate && entryDate <= endDate;
    });
  };

  useEffect(() => {
    const apiUrl = "https://mmh-jajh.onrender.com/mmh/dashboard";

    // Fetch data from the API
    axios
      .get(apiUrl)
      .then((response) => {
        const json = response.data;
        // Handle empty string case and parse numbers
        setData({
          totalAmountSaved: parseFloat(json.totalAmountSaved) || 0,
          monthlyAmountSaved: parseFloat(json.monthAmountSaved) || 0,
          PendingCasesMoreThan5Days:
            parseInt(json.PendingCasesMoreThan5Days) || 0,
          totalClosedCases: parseInt(json.totalClosedCases) || 0,
          totalClosedCasesInMonth: parseInt(json.totalClosedCasesInMonth) || 0,
          totalNumberOfApproach: parseInt(json.totalNumberOfApproach) || 0,
          totalNumberOfMonthApproach:
            parseInt(json.totalNumberOfMonthApproach) || 0,
          registerPatients: parseInt(json.registerPatients) || 0,
          documentUploaded: parseInt(json.uploadDocumentsCount) || 0,
          schemeAndHospitalSelected:
            parseInt(json.hospitalAndSchemeDetails) || 0,
        });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    const apiUserUrl = "https://mmh-jajh.onrender.com/user/getuser";
  
    // Fetch operator numbers from the API
    axios.get(apiUserUrl)
      .then((response) => {
        const operatorData = response.data.data.filter(user => user.userType === "Operator");
        const operatorNumbers = operatorData.map(operator => operator.mobile);
  
        // Fetch data for each operator
        const fetchDataForOperators = async () => {
          const operatorDataPromises = operatorNumbers.map(async (operatorNumber) => {
            const operatorApiUrl = `https://mmh-jajh.onrender.com/mmh/dashboard/operator?phoneNumber=${operatorNumber}`;
            try {
              const operatorResponse = await axios.get(operatorApiUrl);
              return operatorResponse.data.details;
            } catch (error) {
              console.error(`Error fetching operator data for ${operatorNumber}:`, error);
              return null;
            }
          });
  
          // Wait for all operator data to be fetched
          const operatorData = await Promise.all(operatorDataPromises);
  
          // Update state with operator data
          setFilteredData(operatorData.filter((data) => data !== null));
        };
  
        // Fetch overall dashboard data
        const apiUrl = "https://mmh-jajh.onrender.com/mmh/dashboard";
        axios.get(apiUrl)
          .then((response) => {
            const json = response.data;
            // Handle empty string case and parse numbers
            setData({
              totalAmountSaved: parseFloat(json.totalAmountSaved) || 0,
              monthlyAmountSaved: parseFloat(json.monthAmountSaved) || 0,
              PendingCasesMoreThan5Days: parseInt(json.PendingCasesMoreThan5Days) || 0,
              totalClosedCases: parseInt(json.totalClosedCases) || 0,
              totalClosedCasesInMonth: parseInt(json.totalClosedCasesInMonth) || 0,
              totalNumberOfApproach: parseInt(json.totalNumberOfApproach) || 0,
              totalNumberOfMonthApproach: parseInt(json.totalNumberOfMonthApproach) || 0,
              registerPatients: parseInt(json.registerPatients) || 0,
              documentUploaded: parseInt(json.uploadDocumentsCount) || 0,
              schemeAndHospitalSelected: parseInt(json.hospitalAndSchemeDetails) || 0,
            });
          })
          .catch((error) => console.error("Error fetching data: ", error));
  
        // Fetch data for operators
        fetchDataForOperators();
      })
      .catch((error) => console.error("Error fetching operator numbers: ", error));
  }, []);
  

  return (
    <>
      <div className="dashboard-heading">
        <h3>Monthly Status</h3>
      </div>

      <div className="dashbord-main">
        {/* First Row */}

        <div className="dashboard-card amount">
          <h1 className="monthly-amount-heading ">Monthly Amount Saved</h1>
          <p className="card-value">
            ₹ {formatAmount(data.monthlyAmountSaved)}
          </p>
        </div>

        <div className="dashboard-card total-closed-cases cards">
          <h1 className="total-closed-cases-heading ">
            Total Closed Cases In This Month
          </h1>
          <p className="card-value">
            {data.totalClosedCasesInMonth ? data.totalClosedCasesInMonth : 0}
          </p>
        </div>

        <div className="dashboard-card cards">
          <h1 className="total-approach-heading ">
            Total Number of Approaches In This Month
          </h1>
          <p className="card-value">
            {data.totalNumberOfMonthApproach
              ? data.totalNumberOfMonthApproach
              : 0}
          </p>
        </div>

        <div className="dashboard-card pending-cases">
          <h1 className="pending-cases-heading ">
            Pending Cases For More Than 5 Days
          </h1>
          <p className="card-value">
            {data.PendingCasesMoreThan5Days
              ? data.PendingCasesMoreThan5Days
              : 0}
          </p>
        </div>
      </div>
      {/* <hr/> */}
      <div className="dashboard-heading">
        <h3>Overall Status</h3>
      </div>
      <div className="dashbord-main">
        {/* Second Row */}
        <div className="dashboard-big-card">
          <div className="dashboard-card amount">
            <h1 className="total-amount-heading ">Total Amount Saved</h1>
            <p className="card-value">
              ₹ {formatAmount(data.totalAmountSaved)}
            </p>
          </div>

          <div className="dashboard-card cards">
            <h1 className="total-closed-cases-heading">Total Closed Cases</h1>
            <p className="card-value">
              {data.totalClosedCases ? data.totalClosedCases : 0}
            </p>
          </div>

          <div className="dashboard-card cards">
            <h1 className="total-approach-heading">
              Total Number of Approaches
            </h1>
            <p className="card-value">
              {data.totalNumberOfApproach ? data.totalNumberOfApproach : 0}
            </p>
          </div>
        </div>
        <div className="dashboard-heading">
          <h3>Operators Monthly Status</h3>
        </div>


{filteredData.map((operator, index) => (
  <div key={index} className="dashboard-big-card">
    {/* Display operator name and mobile number */}
    <div className="dashboard-card operator-info">
      <h1 className="operator-name">{operator.firstName}</h1>
      <p className="operator-mobile">Mobile: {operator.mobile}</p>
    </div>

    {/* Display operator data in cards */}
    <div className="dashboard-card amount">
      <h1 className="monthly-amount-heading">Monthly Amount Saved</h1>
      <p className="card-value">₹ {formatAmount(operator.monthAmountSaved || 0)}</p>
    </div>

    <div className="dashboard-card pending-cases">
      <h1 className="pending-cases-heading">Pending Cases For More Than 5 Days</h1>
      <p className="card-value">{operator.PendingCasesMoreThan5Days || 0}</p>
    </div>

    <div className="dashboard-card total-closed-cases cards">
      <h1 className="total-closed-cases-heading">Total Closed Cases In This Month</h1>
      <p className="card-value">{operator.totalClosedCasesInMonth || 0}</p>
    </div>

    <div className="dashboard-card cards">
      <h1 className="total-approach-heading">Total Number of Approaches In This Month</h1>
      <p className="card-value">{operator.totalNumberOfMonthApproach || 0}</p>
    </div>
  </div>
))}



      </div>
    </>
  );
};

export default Dashboard;

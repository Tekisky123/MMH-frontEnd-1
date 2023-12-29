// Dashboard.js

import React, { useState, useEffect } from "react";
import "../../Components/dashboard/Dashboard.css";
import * as XLSX from 'xlsx';
import axios from 'axios';


const Dashboard = () => {
  function formatAmount(amount) {
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

    registerPatients:0,
    documentUploaded:0,
    schemeAndHospitalSelected:0,
  });

  const fetchData = async () => {
    try {
      // Replace 'your_api_endpoint' with the actual API endpoint you are using
      const apiEndpoint = 'https://mmh-jajh.onrender.com/patient/getpatient';
      const response = await axios.get(apiEndpoint);

      // Check if the API request was successful (status code 200)
      if (response.status === 200) {
        const entries = response.data.result;  // Replace 'entries' with the actual key containing your data

        // Filter data based on the date range
        const filteredEntries = filterDataByDateRange(entries, startDate, endDate);

        // Add a 'Sr.No.' column and extract other desired fields from each entry
        const formattedEntries = filteredEntries.map((entry, index) => ({
          'Sr.No.': index + 1,
          'Registered Date': entry.registeredDate,
          'Name of Patient': entry.patientDetails.name,
          'Age': entry.patientDetails.age,
          'Gender': entry.patientDetails.sex,
          'Address': entry.patientDetails.address,
          'Contact': entry.patientDetails.mobile,
          'Disease': entry.disease,
          'Referred By': entry.referredBy,
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(formattedEntries);

        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

        // Save the workbook to an Excel file
        XLSX.writeFile(wb, 'patient_data.xlsx');
        console.log('Data has been exported to patient_data.xlsx');
      } else {
        console.error(`Error: Unable to fetch data from the API. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


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
    // Dummy API URL (Replace this with your actual API endpoint)
    const apiUrl = "https://mmh-jajh.onrender.com/mmh/dashboard";

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
    <>
   <div className="dashboard-heading">
        <h3>Monthly Status</h3>
      </div>

    <div className="dashbord-main">
      {/* First Row */}
     
      <div className="dashboard-card amount">
        <h1 className="monthly-amount-heading ">Monthly Amount Saved</h1>
        <p className="card-value">₹ {formatAmount(data.monthlyAmountSaved)}</p>
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
          <p className="card-value">₹ {formatAmount(data.totalAmountSaved)}</p>
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

      {/* <div className="dashboard-big-card">
       <div className="dashboard-card cards">
        <h1 className="total-approach-heading ">Registered Patients</h1>
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
       </div> */}
    </div>
    </>
  
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "../../Components/dashboard/Dashboard.css";

const Reports = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      // Replace 'your_api_endpoint' with the actual API endpoint you are using
      const apiEndpoint = "http://13.126.14.109:4000/patient/getpatient";
      const response = await axios.get(apiEndpoint);

      // Check if the API request was successful (status code 200)
      if (response.status === 200) {
        const entries = response.data.result; // Replace 'entries' with the actual key containing your data

        // Filter data based on the date range
        const filteredEntries = filterDataByDateRange(
          entries,
          startDate,
          endDate
        );

        // Add a 'Sr.No.' column and extract other desired fields from each entry
        const formattedEntries = filteredEntries.map((entry, index) => ({
          "Sr.No.": index + 1,
          "Registered Date": entry.registeredDate,
          "Name of Patient": entry.patientDetails.name,
          Age: entry.patientDetails.age,
          Gender: entry.patientDetails.sex,
          Address: entry.patientDetails.address,
          Contact: entry.patientDetails.mobile,
          Disease: entry.disease,
          "Referred By": entry.referredBy,
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(formattedEntries);

        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

        // Save the workbook to an Excel file
        XLSX.writeFile(wb, "patient_data.xlsx");
        console.log("Data has been exported to patient_data.xlsx");
      } else {
        console.error(
          `Error: Unable to fetch data from the API. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
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

  return (
    <>
      <div style={{ margin: "0px" }} className="dashboard-heading">
        <h3> Patients Report</h3>
      </div>
      <div className="Download-excel">
        <div className="inputDiv">
          <label htmlFor="dateFrom">Patient Registered Date From:</label>
          <input
            id="dateFrom"
            type="date"
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </div>
        <div className="inputDiv">
          <label htmlFor="dateTo">Patient Registered Date To :</label>
          <input
            id="dateTo"
            type="date"
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </div>
        <button onClick={() => fetchData()}>Download Report</button>
      </div>
    </>
  );
};

export default Reports;

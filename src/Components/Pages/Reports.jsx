import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "../../Components/dashboard/Dashboard.css";
import countries from "../../common/CommonObj";

const Reports = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

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
          'SR.NO.': index + 1,
          'REGISTERED DATE5': entry.registeredDate,
          'NAME OF PATIENT': entry.patientDetails.name,
          'AGE': entry.patientDetails.age,
          'GENDER': entry.patientDetails.sex,
          'ADDRESS': entry.patientDetails.address,
          'TALUKA': entry.patientDetails.talukha,
          'DISTRICT': entry.patientDetails.district,
          'STATE': getStateName(entry.patientDetails.state),
          'CONTACT NO.': entry.patientDetails.mobile,
          'INVESTIGATION': entry.diseaseDetail.investigationDone1,
          'DISEASE': entry.disease,
          'REFERRED BY': entry.referredBy,
          'OPD/IPD': "",
          'HOSPITAL': "",
          'TASK COMPLETED PENDING': "",
          'REMARK': "",
          'RATION CARD': entry.patientDetails.rationcardnumber,
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(formattedEntries);

// Make the heading row bold
const boldHeaderStyle = { font: { bold: true } };
Object.keys(formattedEntries[0]).forEach((key, colIndex) => {
  const headerCell = XLSX.utils.encode_cell({ r: 0, c: colIndex });
  ws[headerCell] = { ...ws[headerCell], ...boldHeaderStyle };
});

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

  const getStateName = (index) => {
    if (index >= 0 && index < countries.length) {
      return countries[index].state;
    }
    return ''; // Return an empty string or any default value if the index is out of bounds
  };

  return (
    <>
      <div style={{ margin: "0px" }} className="dashboard-heading">
        <h3>Registered Patients Report</h3>
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
        {/* <button onClick={() => fetchData()}>Download Report</button> */}
        <button onClick={() => fetchData()} disabled={!startDate || !endDate}>
          Download Report
        </button>
      </div>
    </>
  );
};

export default Reports;

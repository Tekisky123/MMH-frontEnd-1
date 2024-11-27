import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "../../Components/dashboard/Dashboard.css";
import countries from "../../common/CommonObj";
import BaseURL from "../../common/Api";

const Reports = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchData = async () => {
    try {
      const apiEndpoint = `${BaseURL}/patient/getpatient`;
      const response = await axios.get(apiEndpoint);
  
      if (response.status === 200) {
        const entries = response.data.result;
  
        // Filter data by date range
        const filteredEntries = filterDataByDateRange(entries, startDate, endDate);
  
        // Format data for Excel
        const formattedEntries = filteredEntries.map((entry, index) => ({
          "SR.NO.": index + 1,
          "REGISTERED DATE": formatDate(entry.registeredDate),
          "NAME OF PATIENT": entry.patientDetails.name,
          AGE: entry.patientDetails.age,
          GENDER: entry.patientDetails.sex,
          ADDRESS: entry.patientDetails.address,
          TALUKA: entry.patientDetails.talukha,
          DISTRICT: entry.patientDetails.district,
          // STATE: getStateName(entry.patientDetails.state),
          "CONTACT NO.": entry.patientDetails.mobile,
          INVESTIGATION: entry.diseaseDetail.investigationDone1,
          DISEASE: entry.diseaseDetail.name,
          "REFERRED BY": entry.referredBy,
          "OPD/IPD": entry.diseaseDetail.opd || entry.diseaseDetail.ipd || "",
          HOSPITAL: entry.diseaseDetail.currentHospitalName,
          "TASK STATUS": entry.status,
          REMARK: entry.comments || "",
          "RATION CARD": entry.patientDetails.rationcardnumber || "N/A",
        }));
  
        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(formattedEntries);
  
        // Create a workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Registered Patients");
  
        // Save the workbook as an Excel file
        XLSX.writeFile(wb, "Registered_Patients_Report.xlsx");
        console.log("Data has been exported to Registered_Patients_Report.xlsx");
      } else {
        console.error(
          `Error: Unable to fetch data from the API. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  // Utility function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
    return ""; // Return an empty string or any default value if the index is out of bounds
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

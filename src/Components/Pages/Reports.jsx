import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "../../Assets/Styles/AdminForms.css";
import { MdAssessment, MdDownload } from "react-icons/md";
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
    <div className="npt-root">
      <div className="npt-wrapper" style={{ maxWidth: '600px' }}>
        <div className="npt-card">
          <div className="npt-card-header" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', padding: '24px' }}>
            <div className="npt-dash-icon" style={{ background: '#e0f2fe', color: '#0284c7', width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0 }}>
              <MdAssessment size={24} />
            </div>
            <div>
              <h2 className="npt-card-title" style={{ margin: 0 }}>Registered Patients Report</h2>
              <p className="npt-card-subtitle" style={{ margin: 0 }}>Export patient data filtered by registration date.</p>
            </div>
          </div>

          <div className="npt-form-body">
            <div className="npt-grid-2">
              {/* Start Date */}
              <div className="npt-field">
                <label className="npt-label">Date From</label>
                <div className="npt-input-wrap">
                  <input
                    className="npt-input"
                    type="date"
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                  />
                </div>
              </div>

              {/* End Date */}
              <div className="npt-field">
                <label className="npt-label">Date To</label>
                <div className="npt-input-wrap">
                  <input
                    className="npt-input"
                    type="date"
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="npt-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                className="npt-btn npt-btn--primary"
                onClick={() => fetchData()}
                disabled={!startDate || !endDate}
                style={{ opacity: (!startDate || !endDate) ? 0.6 : 1 }}
              >
                <MdDownload size={18} /> Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

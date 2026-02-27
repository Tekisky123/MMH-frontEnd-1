// Dashboard.js

import React, { useState, useEffect } from "react";
import "../../Components/dashboard/Dashboard.css";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import BaseURL from "../../common/Api";
import { MdOutlineUploadFile, MdAddHomeWork, MdCheckCircle, MdPendingActions } from "react-icons/md";

const OperatorDashboard = () => {
  const { number } = useParams();

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
    closePatientDetailsCount: 0,

  });

  // useEffect(() => {
  //   // Dummy API URL (Replace this with your actual API endpoint)
  //   const apiUrl = "https://mmhbackendrailwa-production.up.railway.app/mmh/dashboard";

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
    getOperatorData();
  }, []);

  const getOperatorData = async (e) => {
    try {
      const mobilenumber = localStorage.getItem("mobileNumber");
      const url =
        `${BaseURL}/mmh/dashboard/operator?phoneNumber=`;
      const response = await axios.get(url + mobilenumber);

      console.log("response: ", response.data);

      if (response.status === 200 || response.data.success) {
        console.log("response details: ", response.data.details);

        setData({
          totalAmountSaved: response.data.details.totalAmountSaved,
          monthlyAmountSaved: response.data.details.monthAmountSaved,
          PendingCasesMoreThan5Days: response.data.details.pendingPatientsCount,
          totalClosedCases: response.data.details.totalClosedCases,
          totalClosedCasesInMonth:
            response.data.details.totalClosedCasesInMonth,
          totalNumberOfApproach: response.data.details.totalNumberOfApproach,
          totalNumberOfMonthApproach:
            response.data.details.totalNumberOfMonthApproach,

          registerPatients: response.data.details.registerPatients,
          documentUploaded: response.data.details.uploadDocumentsCount,
          closePatientDetailsCount: response.data.details.closePatientDetailsCount,
          schemeAndHospitalSelected:
            response.data.details.hospitalAndSchemeCount,
        });
      }
    } catch (error) {
      console.error("API call error:", error.message);
    }
  };

  return (
    <div className="npt-dashboard-container">
      {/* SECTION: Pending Activities */}
      <div className="npt-dashboard-section">
        <h3 className="npt-dashboard-title">Pending Activities</h3>
        <div className="npt-dashboard-grid">

          <div className="npt-dash-card npt-card-orange">
            <div className="npt-dash-icon"><MdOutlineUploadFile /></div>
            <div className="npt-dash-info">
              <p className="npt-dash-label">Document Uploaded</p>
              <NavLink to="/opRegistered-patients/documentsUploaded" className="npt-dash-value" style={{ textDecoration: 'none' }}>
                {data.documentUploaded || 0}
              </NavLink>
            </div>
          </div>

          <div className="npt-dash-card npt-card-purple">
            <div className="npt-dash-icon"><MdAddHomeWork /></div>
            <div className="npt-dash-info">
              <p className="npt-dash-label">Scheme & Hospital Selected</p>
              <NavLink to="/opRegistered-patients/scheme&hospital" className="npt-dash-value" style={{ textDecoration: 'none' }}>
                {data.schemeAndHospitalSelected || 0}
              </NavLink>
            </div>
          </div>

          <div className="npt-dash-card npt-card-blue">
            <div className="npt-dash-icon"><MdPendingActions /></div>
            <div className="npt-dash-info">
              <p className="npt-dash-label">Registered Patients</p>
              <NavLink to="/opRegistered-patients/pending" className="npt-dash-value" style={{ textDecoration: 'none' }}>
                {data.PendingCasesMoreThan5Days || 0}
              </NavLink>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION: Cases Closed */}
      <div className="npt-dashboard-section">
        <h3 className="npt-dashboard-title">Cases Closed</h3>
        <div className="npt-dashboard-grid">

          <div className="npt-dash-card npt-card-green" style={{ maxWidth: '400px' }}>
            <div className="npt-dash-icon"><MdCheckCircle /></div>
            <div className="npt-dash-info">
              <p className="npt-dash-label">Cases closed this month</p>
              <NavLink to="/opRegistered-patients/closed" className="npt-dash-value" style={{ textDecoration: 'none' }}>
                {data.closePatientDetailsCount || 0}
              </NavLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;

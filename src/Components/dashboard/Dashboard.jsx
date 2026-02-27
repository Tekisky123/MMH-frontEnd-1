import React, { useState, useEffect } from "react";
import "../../Components/dashboard/Dashboard.css";
import axios from "axios";
import BaseURL from "../../common/Api";
import { MdCurrencyRupee, MdWorkHistory, MdPeopleAlt, MdPendingActions, MdPerson, MdCheckCircle } from "react-icons/md";

const Dashboard = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const { data: dashboardData } = await axios.get(`${BaseURL}/mmh/dashboard`);
        setData({
          totalAmountSaved: parseFloat(dashboardData.totalAmountSaved) || 0,
          monthlyAmountSaved: parseFloat(dashboardData.monthAmountSaved) || 0,
          PendingCasesMoreThan5Days: parseInt(dashboardData.PendingCasesMoreThan5Days) || 0,
          totalClosedCases: parseInt(dashboardData.totalClosedCases) || 0,
          totalClosedCasesInMonth: parseInt(dashboardData.totalClosedCasesInMonth) || 0,
          totalNumberOfApproach: parseInt(dashboardData.totalNumberOfApproach) || 0,
          totalNumberOfMonthApproach: parseInt(dashboardData.totalNumberOfMonthApproach) || 0,
          registerPatients: parseInt(dashboardData.registerPatients) || 0,
          documentUploaded: parseInt(dashboardData.uploadDocumentsCount) || 0,
          schemeAndHospitalSelected: parseInt(dashboardData.hospitalAndSchemeDetails) || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
      }
    };

    const fetchOperatorsData = async () => {
      try {
        const { data: operatorResponse } = await axios.get(`${BaseURL}/user/getuser`);
        const operators = operatorResponse.data.filter((user) => user.userType === "Operator");

        const operatorDetails = await Promise.all(
          operators.map(async (operator) => {
            try {
              const { data: operatorData } = await axios.get(
                `${BaseURL}/mmh/dashboard/operator?phoneNumber=${operator.mobile}`
              );
              return {
                firstName: operator.firstName,
                lastName: operator.lastName,
                mobile: operator.mobile,
                additionalData: operatorData.details,
                amountData: operatorData.monthsAmountSavedDetails || 0,
              };
            } catch (error) {
              console.error(`Error fetching data for operator: ${operator.mobile}`, error);
              return { ...operator, additionalData: null, amountData: 0 };
            }
          })
        );

        if (isMounted) setFilteredData(operatorDetails);
      } catch (error) {
        console.error("Error fetching operators data: ", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDashboardData();
    fetchOperatorsData();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatAmount = (amount) => {
    if (!amount) return "0";
    if (amount >= 1_000_000_000) return (amount / 1_000_000_000).toFixed(1) + "B";
    if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(1) + "M";
    if (amount >= 1_000) return (amount / 1_000).toFixed(1) + "K";
    return amount.toString();
  };

  return (
    <div className="npt-dashboard-container">
      <div className="npt-dashboard-section">
        <h3 className="npt-dashboard-title">Monthly Status</h3>
        <div className="npt-dashboard-grid">
          <div className="npt-dash-card npt-card-green">
            <div className="npt-dash-icon"><MdCurrencyRupee /></div>
            <div className="npt-dash-info">
              <p className="npt-dash-label">Monthly Amount Saved</p>
              <h2 className="npt-dash-value">₹{formatAmount(data.monthlyAmountSaved)}</h2>
            </div>
          </div>

          <div className="npt-dash-card npt-card-blue">
            <div className="npt-dash-icon"><MdCheckCircle /></div>
            <div className="npt-dash-info">
              <p className="npt-dash-label">Closed Cases (This Month)</p>
              <h2 className="npt-dash-value">{data.totalClosedCasesInMonth || 0}</h2>
            </div>
          </div>

          <div className="npt-dash-card npt-card-purple">
            <div className="npt-dash-icon"><MdPeopleAlt /></div>
            <div className="npt-dash-info">
              <p className="npt-dash-label">Total Approaches (This Month)</p>
              <h2 className="npt-dash-value">{data.totalNumberOfMonthApproach || 0}</h2>
            </div>
          </div>

          <div className="npt-dash-card npt-card-orange">
            <div className="npt-dash-icon"><MdPendingActions /></div>
            <div className="npt-dash-info">
              <p className="npt-dash-label">Pending Cases {'>'} 5 Days</p>
              <h2 className="npt-dash-value">{data.PendingCasesMoreThan5Days || 0}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="npt-dashboard-section">
        <h3 className="npt-dashboard-title">Overall Status</h3>
        <div className="npt-dashboard-grid">
          <div className="npt-dash-card npt-card-green">
            <div className="npt-dash-icon"><MdCurrencyRupee /></div>
            <div className="npt-dash-info">
              <p className="npt-dash-label">Total Amount Saved</p>
              <h2 className="npt-dash-value">₹{formatAmount(data.totalAmountSaved)}</h2>
            </div>
          </div>

          <div className="npt-dash-card npt-card-blue">
            <div className="npt-dash-icon"><MdWorkHistory /></div>
            <div className="npt-dash-info">
              <p className="npt-dash-label">Total Closed Cases</p>
              <h2 className="npt-dash-value">{data.totalClosedCases || 0}</h2>
            </div>
          </div>

          <div className="npt-dash-card npt-card-purple">
            <div className="npt-dash-icon"><MdPeopleAlt /></div>
            <div className="npt-dash-info">
              <p className="npt-dash-label">Total Approaches</p>
              <h2 className="npt-dash-value">{data.totalNumberOfApproach || 0}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="npt-dashboard-section">
        <h3 className="npt-dashboard-title">Operators Monthly Status</h3>
        <div className="npt-operator-list">
          {isLoading ? (
            // Skeleton Loader
            [1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="npt-op-card skeleton-card">
                <div className="npt-op-header">
                  <div className="npt-op-avatar skeleton-pulse" style={{ background: '#e2e8f0' }}></div>
                  <div className="npt-op-details" style={{ width: '100%' }}>
                    <div className="skeleton-line" style={{ width: '60%', height: '16px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '8px' }}></div>
                    <div className="skeleton-line" style={{ width: '40%', height: '12px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div className="npt-op-stats">
                  {[1, 2, 3, 4].map((stat) => (
                    <div key={stat} className="npt-op-stat">
                      <div className="skeleton-line" style={{ width: '50%', height: '10px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '6px' }}></div>
                      <div className="skeleton-line" style={{ width: '80%', height: '16px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : filteredData.length > 0 ? (
            // Real Data
            filteredData.map((operator, index) => (
              <div key={index} className="npt-op-card">
                <div className="npt-op-header">
                  <div className="npt-op-avatar"><MdPerson /></div>
                  <div className="npt-op-details">
                    <h4>{operator.firstName} {operator.lastName}</h4>
                    <p>{operator.mobile}</p>
                  </div>
                </div>
                <div className="npt-op-stats">
                  <div className="npt-op-stat">
                    <span>Saved</span>
                    <strong>₹{formatAmount(operator.amountData)}</strong>
                  </div>
                  <div className="npt-op-stat">
                    <span>Closed</span>
                    <strong>{operator.additionalData?.closePatientDetailsCount || 0}</strong>
                  </div>
                  <div className="npt-op-stat">
                    <span>Approached</span>
                    <strong>{operator.additionalData?.allDataResponse?.length || 0}</strong>
                  </div>
                  <div className="npt-op-stat">
                    <span>Pending {'>'} 5 Days</span>
                    <strong className="npt-text-danger">{operator.additionalData?.pendingPatientsCount || 0}</strong>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '20px', color: '#64748b', textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>
              No operators found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

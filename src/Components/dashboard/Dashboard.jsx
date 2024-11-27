import React, { useState, useEffect } from "react";
import "../../Components/dashboard/Dashboard.css";
import axios from "axios";
import BaseURL from "../../common/Api";

const Dashboard = () => {
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

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
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
    <>
      <div className="dashboard-heading">
        <h3>Monthly Status</h3>
      </div>

      <div className="dashbord-main">
        <div className="dashboard-card amount">
          <h1 className="monthly-amount-heading ">Monthly Amount Saved</h1>
          <p className="card-value">₹ {formatAmount(data.monthlyAmountSaved)}</p>
        </div>
        <div className="dashboard-card total-closed-cases cards">
          <h1 className="total-closed-cases-heading ">Total Closed Cases In This Month</h1>
          <p className="card-value">{data.totalClosedCasesInMonth || 0}</p>
        </div>
        <div className="dashboard-card cards">
          <h1 className="total-approach-heading ">Total Number of Approaches In This Month</h1>
          <p className="card-value">{data.totalNumberOfMonthApproach || 0}</p>
        </div>
        <div className="dashboard-card pending-cases">
          <h1 className="pending-cases-heading ">Pending Cases For More Than 5 Days</h1>
          <p className="card-value">{data.PendingCasesMoreThan5Days || 0}</p>
        </div>
      </div>

      <div className="dashboard-heading">
        <h3>Overall Status</h3>
      </div>
      <div className="dashbord-main">
        <div className="dashboard-big-card">
          <div className="dashboard-card amount">
            <h1 className="total-amount-heading ">Total Amount Saved</h1>
            <p className="card-value">₹ {formatAmount(data.totalAmountSaved)}</p>
          </div>
          <div className="dashboard-card cards">
            <h1 className="total-closed-cases-heading">Total Closed Cases</h1>
            <p className="card-value">{data.totalClosedCases || 0}</p>
          </div>
          <div className="dashboard-card cards">
            <h1 className="total-approach-heading">Total Number of Approaches</h1>
            <p className="card-value">{data.totalNumberOfApproach || 0}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-heading">
        <h3>Operators Monthly Status</h3>
      </div>
      <div className="dashbord-main">
        {filteredData.map((operator, index) => (
          <div key={index} className="dashboard-big-card">
            <div className="dashboard-card operator-info">
              <p>
                <span> Name:</span> {operator.firstName} {operator.lastName}
              </p>
              <hr />
              <p>
                <span>Mobile: </span>
                {operator.mobile}
              </p>
            </div>
            <div className="dashboard-card amount">
              <h1 className="total-amount-heading">Monthly Amount Saved Details</h1>
              <p className="card-value smallvalue">₹ {formatAmount(operator.amountData)}</p>
            </div>
            <div className="dashboard-card pending-cases">
              <h1 className="pending-cases-heading">Pending Cases For More Than 5 Days</h1>
              <p className="card-value">{operator.additionalData?.pendingPatientsCount || 0}</p>
            </div>
            <div className="dashboard-card total-closed-cases cards">
              <h1 className="total-closed-cases-heading">Total Closed Cases In This Month</h1>
              <p className="card-value">
                {operator.additionalData?.closePatientDetailsCount || 0}
              </p>
            </div>
            <div className="dashboard-card cards">
              <h1 className="total-approach-heading smallheading">
                Total Number of Approaches In This Month
              </h1>
              <p className="card-value">
                {operator.additionalData?.allDataResponse?.length || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;

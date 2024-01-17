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
  const [selectedOperator, setSelectedOperator] = useState(null);

  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [operatorDetails, setOperatorDetails] = useState([]); // Declare operatorDetails state

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

    const fetchData = async () => {
      try {
        // Fetch data from the main dashboard API
        const dashboardApiResponse = await axios.get(
          "https://mmh-jajh.onrender.com/mmh/dashboard"
        );
        const json = dashboardApiResponse.data;

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

        // Fetch data from the operator API
        const operatorsApiResponse = await axios.get(
          "https://mmh-jajh.onrender.com/user/getuser"
        );
        const operators = operatorsApiResponse.data.data.filter(
          (user) => user.userType === "Operator"
        );
        const operatorDetails = operators.map((operator) => ({
          firstName: operator.firstName,
          lastName: operator.lastName,
          mobile: operator.mobile,
        }));

        // Update state with operator details
        setOperatorDetails(operatorDetails);
        setLoading(false);

        // Fetch additional data for each operator
        const fetchDataForOperators = async () => {
          try {
            const promises = operatorDetails.map(async (operator) => {
              console.log(`Fetching data for operator: ${operator.mobile}`);
              try {
                const operatorApiResponse = await axios.get(
                  `https://mmh-jajh.onrender.com/mmh/dashboard/operator?phoneNumber=${operator.mobile}`
                );
                const additionalData = operatorApiResponse.data.details;
                console.log(
                  `Data received for operator: ${operator.mobile}`,
                  additionalData
                );
                return { ...operator, additionalData };
              } catch (error) {
                console.error(
                  `Error fetching data for operator: ${operator.mobile}`,
                  error
                );
                return { ...operator, additionalData: null };
              }
            });

            const updatedFilteredData = await Promise.all(promises);

            // Check if the component is still mounted before updating the state
            if (isMounted) {
              setFilteredData(updatedFilteredData);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching data for operators: ", error);
          }
        };

        // Call the fetchDataForOperators only when filteredData changes
        if (loading && operatorDetails.length > 0) {
          fetchDataForOperators();
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts


    return () => {
      // Set isMounted to false when the component is unmounted
      isMounted = false;
    };
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

        {filteredData.map((operator, index) => {
            console.log("Operator data:", operator);

          return (
            <div key={index} className="dashboard-big-card">
              {/* Display operator name and mobile number */}
              <div className="dashboard-card operator-info">
                <p>
                  Name: {operator.firstName} {operator.lastName}
                </p>
                <p>Mobile: {operator.mobile}</p>
              </div>

              {/* Display operator data in cards */}
              <div className="dashboard-card amount">
                <h1 className="monthly-amount-heading">Monthly Amount Saved</h1>
                <p className="card-value">
  ₹ {formatAmount(
    operator?.additionalData?.allDataResponse?.[0]?.amountSaved || 0
  )}
</p>
              </div>

              <div className="dashboard-card pending-cases">
                <h1 className="pending-cases-heading">
                  Pending Cases For More Than 5 Days
                </h1>
                <p className="card-value">
                  {operator?.additionalData?.pendingPatientsCount || 0}
                </p>
              </div>

              <div className="dashboard-card total-closed-cases cards">
                <h1 className="total-closed-cases-heading">
                  Total Closed Cases In This Month
                </h1>
                <p className="card-value">
                  {operator?.additionalData?.closePatientDetailsCount || 0}
                </p>
              </div>

              <div className="dashboard-card cards">
                <h1 className="total-approach-heading">
                  Total Number of Approaches In This Month
                </h1>
                <p className="card-value">
                  {operator?.additionalData?.allDataResponse?.length ||
                    0}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;

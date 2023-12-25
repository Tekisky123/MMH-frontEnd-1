import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const Reports = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('monthly');
  const [dataToExport, setDataToExport] = useState([]);

  const fetchData = async (timeRange) => {
    try {
      const apiEndpoint = `http://13.126.14.109:4000/patient/getpatient?timeRange=${timeRange}`;
      const response = await axios.get(apiEndpoint);

      if (response.status === 200) {
        const entries = response.data.result;

        const formattedEntries = entries.map((entry, index) => ({
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

        setDataToExport(formattedEntries);
      } else {
        console.error(`Error: Unable to fetch data from the API. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleTimeRangeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTimeRange(selectedValue);
  };

  const handleExportData = () => {
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    const fileName = `patient_data_${selectedTimeRange}.xlsx`;
    XLSX.writeFile(wb, fileName);
    console.log(`Data has been exported to ${fileName}`);
  };

  useEffect(() => {
    fetchData(selectedTimeRange);
  }, [selectedTimeRange]);

  return (
    <div>
      <label htmlFor="timeRange">Select Time Range: </label>
      <select id="timeRange" value={selectedTimeRange} onChange={handleTimeRangeChange}>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <button onClick={handleExportData}>Export Data</button>

      {/* Your React component content */}
    </div>
  );
};

export default Reports;
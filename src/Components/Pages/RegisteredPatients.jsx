import React, { useState } from "react";
// import axios from 'axios';
import "../../Assets/Styles/RegisteredPatients.css";
import check from "../../Assets/Images/check.png";
import error from "../../Assets/Images/error.png";

const RegisteredPatients = ({ patient }) => {
  const [file, setFile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Perform logic to handle the file, for example, you can upload it to a server
    // Simulating asynchronous file upload using setTimeout
    setTimeout(() => {
      console.log("File uploaded:", selectedFile.name);
      setFile(selectedFile);
    }, 1000); // Simulating a delay for illustration purposes
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleAddFile = () => {
    // Simulate file input click
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleSidebarClose = () => {
    setShowDetails(false);
  };

  return (
    <div className="patient-card">
      <div className="patient-data">
        <h6>ID: </h6>
        <h6>Name: </h6>
        <h6>Gender: </h6>
        <h6>Age: </h6>
        {/* Add other details as needed */}
      </div>
      <div className="data-btn">
        {file ? (
          <div className="documents">
          <img src={check} alt="" />
          <button onClick={handleRemoveFile} className="btn-register">
            Remove Document
          </button>
          </div>
        ) : (
          <div className="documents">
          <img src={error} alt="" />
            <button onClick={handleAddFile} className="btn-register">
              Add Document
            </button>
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        )}
        {file && (
          <div className="file-attached">
            <p>File attached: {file.name}</p>
          </div>
        )}
        <button className="btn-register-more" onClick={handleShowDetails}>
          More Info
        </button>
      </div>

      {showDetails && (
        <div className="patient-details-sidebar">
          <span className="close-icon" onClick={handleSidebarClose}>
            ❌
          </span>
          <h2>Patient Details</h2>
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID</td>
                <td></td>
              </tr>
              <tr>
                <td>Name</td>
                <td></td>
              </tr>
              <tr>
                <td>Gender</td>
                <td></td>
              </tr>
              {/* <tr>
                <td>Age</td>
                <td>{patient.age}</td>
              </tr> */}
              <tr>
                <td>Age</td>
                <td></td>
              </tr>
              <tr>
                <td>Document</td>
                <td>
                  {file ? (
                    <>
                      <img
                        src={check}
                        alt="File Uploaded"
                        className="file-upload-logo"
                      />
                      <span className="file-upload">File uploaded</span>
                    </>
                  ) : (
                    <>
                      <img
                        src={error}
                        alt="File Not Uploaded"
                        className="file-upload-logo"
                      />
                      <span className="file-not-found">File not uploaded</span>
                    </>
                  )}
                </td>
              </tr>
              {/* Add other rows for additional details */}
            </tbody>
          </table>
          {/* Fetch additional patient details using Axios or your preferred method */}
          {/* Display additional details here */}
        </div>
      )}
    </div>
  );
};

export default RegisteredPatients;

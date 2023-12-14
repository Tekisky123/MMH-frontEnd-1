import React, { useState, useEffect } from "react";
import "../../Assets/Styles/RegisteredPatients.css";
import check from "../../Assets/Images/check.png";
import error from "../../Assets/Images/error.png";
import axios from "axios";

const RegisteredPatients = () => {
  const [file, setFile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
 

 

  const handleShowDetails = (id) => {
    setShowDetails(!showDetails);
    console.log("index",id);
    setShowStatus(false);
  };

  const handleShowStatus = () => {
    console.log("Show Status clicked");
    setShowStatus(!showStatus);
    setShowDetails(false);
  };

  const handleSidebarClose = () => {
    setShowDetails(false);
    setShowStatus(false);
  };

  return (
    <>
    <div className="patient-card">
      <div className="patient-data">
        <h6>ID: dummy id</h6>
        <h6>Name: dummy name </h6>
        <h6>Gender: dummy gender </h6>
        <h6>Age: dummy age </h6>

        <p>
          {file ? (
            <div className="file-upload-or-not">
              <img
                src={check}
                alt="File Uploaded"
                className="file-upload-logo"
              />
              <span className="file-upload">File uploaded</span>
            </div>
          ) : (
            <div className="file-upload-or-not">
              <img
                src={error}
                alt="File Not Uploaded"
                className="file-upload-logo"
              />
              <span className="file-not-found">File not uploaded</span>
            </div>
          )}
        </p>
      </div>
      <div className="data-btn">
        <button className="btn-register-more" onClick={handleShowDetails}>
          More Info
        </button>
        <button
          className="btn-register-status btn-register-status"
          onClick={handleShowStatus}
        >
          Status
        </button>
      </div>

      {showDetails && (
        <div className="patient-details-sidebar">
          <span className="close-icon" onClick={handleSidebarClose}>
            ❌
          </span>
          <h1 className="table-heading">Patient Details</h1>
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Patient Name</td>
                <td>dummy name </td>
              </tr>
              <tr>
                <td>Residencial Address</td>
                <td>dummy address</td>
              </tr>
              <tr>
                <td>Taluka</td>
                <td>dummy taluka</td>
              </tr>
              <tr>
                <td>Dist</td>
                <td>dummy age</td>
              </tr>
              <tr>
                <td>State</td>
                <td>dummy state</td>
              </tr>
            </tbody>
          </table>

          <h1 className="table-heading">Family Details</h1>
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Family Member</td>
                <td>dummy member </td>
              </tr>
              <tr>
                <td>Relation</td>
                <td>dummy relation</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>dummy Age</td>
              </tr>
              <tr>
                <td>Occupation</td>
                <td>dummy Occupation</td>
              </tr>
              <tr>
                <td>Monthly Income</td>
                <td>dummy Income</td>
              </tr>
            </tbody>
          </table>

          <h1 className="table-heading">Care Taker</h1>
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>dummy Name </td>
              </tr>
              <tr>
                <td>Mobile No.1</td>
                <td>dummy number</td>
              </tr>
              <tr>
                <td> Mobile No.2</td>
                <td>dummy number</td>
              </tr>
              <tr>
                <td>Particulars </td>
                <td>dummy Particulars </td>
              </tr>
            </tbody>
          </table>

          <h1 className="table-heading">Disease Details</h1>
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Disease Name</td>
                <td>dummy Disease Name </td>
              </tr>
              <tr>
                <td>Diagnose Date </td>
                <td>dummy Diagnose Date </td>
              </tr>
              <tr>
                <td>Diagnose by Dr</td>
                <td>dummy Diagnose by Dr</td>
              </tr>
              <tr>
                <td>Investigation Done</td>
                <td>dummy Investigation Done</td>
              </tr>
              <tr>
                <td>Current Hospital Name</td>
                <td>dummy Current Hospital Name</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>dummy Address</td>
              </tr>
              <tr>
                <td>Contact No.</td>
                <td>dummy Contact No.</td>
              </tr>
              <tr>
                <td>Current Treatment Details </td>
                <td>dummy Current Treatment Details </td>
              </tr>
              <tr>
                <td>Doctor’s advice for further process</td>
                <td>dummy Doctor’s advice for further process </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {showStatus && (
        <div className="patient-status-sidebar">
          <span className="close-icon" onClick={handleSidebarClose}>
            ❌
          </span>
          <h2>Document</h2>
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
        </div>
      )}
    </div>
    </>
  );
};

export default RegisteredPatients;

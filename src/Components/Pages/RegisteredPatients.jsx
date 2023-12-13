import React, { useEffect, useState } from "react";
// import axios from 'axios';
import "../../Assets/Styles/RegisteredPatients.css";
import check from "../../Assets/Images/check.png";
import error from "../../Assets/Images/error.png";
import axios from "axios";

const RegisteredPatients = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  // const dataArray = Object.values(data);

  //   const [loader, setLoader] = useState(false);

  const baseURL = "http://13.126.14.109:5050/patient/getpatient";

  useEffect(() => {
    axios
      .get("http://13.126.14.109:5050/patient/getpatient")
      .then((responce) => {
        console.log(responce.data.result);

        setData(responce.data.result);
      });

    // getData();
  }, []);

  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = (id) => {
    console.log("index",id);
    setShowDetails(!showDetails);
  };

  const handleSidebarClose = () => {
    setShowDetails(false);
  };

  return (
    <>
      {data.map((item, index) => {
        return (
          <div className="patient-card">
            <div className="patient-data">
              <h6>ID: {index + 1} </h6>
              <h6>Name: {item.patientDetails.name} </h6>
              <h6>Gender: {item.patientDetails.sex}</h6>
              <h6>Age: {item.patientDetails.age} </h6>
              {/* Add other details as needed */}
            </div>
            <div className="data-btn">
              <button className="btn-register-more" onClick={(_id)=>handleShowDetails(_id)}>
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
                      <td>{index + 1}</td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>{item.patientDetails.name}</td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>{item.patientDetails.sex}</td>
                    </tr>
                    {/* <tr>
                <td>Age</td>
                <td>{patient.age}</td>
              </tr> */}
                    <tr>
                      <td>Age</td>
                      <td>{item.patientDetails.age}</td>
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
                            <span className="file-not-found">
                              File not uploaded
                            </span>
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
      })}
    </>
  );
};

export default RegisteredPatients;

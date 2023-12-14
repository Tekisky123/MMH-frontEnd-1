import React, { useState, useEffect } from "react";
import "../../Assets/Styles/RegisteredPatients.css";
import check from "../../Assets/Images/check.png";
import error from "../../Assets/Images/error.png";
import axios from "axios";

const RegisteredPatients = () => {
  const [file, setFile] = useState(null);
  // const [showDetails, setShowDetails] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [data, setData] = useState([]);
  const [activePatientId, setActivePatientId] = useState(false);

  const baseURL = "http://13.126.14.109:4000/patient/getpatient";

  useEffect(() => {
    axios.get(baseURL).then((responce) => {
      console.log(responce.data.result);

      setData(responce.data.result);
    });

    // getData();
  }, []);

  const handleShowDetails = (_id) => {
    // setShowDetails(!showDetails);
    console.log("index", _id);
    setShowStatus(false);
    setActivePatientId(_id);
    
  };

  const handleShowStatus = () => {
    console.log("Show Status clicked");
    setShowStatus(!showStatus);
    // setShowDetails(false);
    setActivePatientId(null);
  };

  const handleSidebarClose = () => {
    // setShowDetails(false);
    setShowStatus(false);
    setActivePatientId(!false);
  };

  return (
    <>
     <div className="maincontainer">
     {data.map((item, index) => {
      const isDetailsActive = activePatientId === item.patientDetails._id;
        return (
          <div className="patient-card" key={index}>
            <div className="patient-data">
              <h6>ID: {item.patientDetails._id}</h6>
              <h6>Name: {item.patientDetails.name} </h6>
              <h6>Gender: {item.patientDetails.sex} </h6>
              <h6>Age: {item.patientDetails.age} </h6>

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
                    <div className="data-btn">
              <button className="btn-register-more" onClick={()=>handleShowDetails(item.patientDetails._id)}>
                More Info
              </button>
              <button
                className="btn-register-status btn-register-status"
                onClick={handleShowStatus}
              >
                Status
              </button>
            </div>
                    <br />
                   
                  </div>
                  
                )}
              </p>
              
            </div>
            
            {isDetailsActive && (
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
                      <td>{item.patientDetails.name} </td>
                    </tr>
                    <tr>
                      <td>Residencial Address</td>
                      <td>{item.patientDetails.address}</td>
                    </tr>
                    <tr>
                      <td>Taluka</td>
                      <td>{item.patientDetails.talukha}</td>
                    </tr>
                    <tr>
                      <td>Dist</td>
                      <td>{item.patientDetails.district}</td>
                    </tr>
                    <tr>
                      <td>State</td>
                      <td>{item.patientDetails.state}</td>
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
                      <td>{item.familyDetail[0].name} </td>
                    </tr>
                    <tr>
                      <td>Relation</td>
                      <td>{item.familyDetail[0].relation}</td>
                    </tr>
                    <tr>
                      <td>Age</td>
                      <td>{item.familyDetail[0].age}</td>
                    </tr>
                    <tr>
                      <td>Occupation</td>
                      <td>{item.familyDetail[0].occupation}</td>
                    </tr>
                    <tr>
                      <td>Monthly Income</td>
                      <td>{item.familyDetail[0].monthlyIncome}</td>
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
                      <td>{item.careTaker.name} </td>
                    </tr>
                    <tr>
                      <td>Mobile No.1</td>
                      <td>{item.careTaker.mobile1}</td>
                    </tr>
                    <tr>
                      <td> Mobile No.2</td>
                      <td>{item.careTaker.mobile2}</td>
                    </tr>
                    <tr>
                      <td>Particulars </td>
                      <td>{item.careTaker.particulars}</td>
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
                      <td>{item.diseaseDetail.name}</td>
                    </tr>
                    <tr>
                      <td>Diagnose Date </td>
                      <td>{item.diseaseDetail.diagnoseDate} </td>
                    </tr>
                    <tr>
                      <td>Diagnose by Dr</td>
                      <td>{item.diseaseDetail.diagnoseBy}</td>
                    </tr>
                    <tr>
                      <td>Investigation Done</td>
                      <td>{item.diseaseDetail.investigationDone1}</td>
                    </tr>
                    <tr>
                      <td>Current Hospital Name</td>
                      <td>{item.diseaseDetail.currentHospitalName}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{item.diseaseDetail.currentHospitalAddress}</td>
                    </tr>
                    <tr>
                      <td>Contact No.</td>
                      <td>{item.diseaseDetail.currentHospitalContactNo}</td>
                    </tr>
                    <tr>
                      <td>Current Treatment Details </td>
                      <td>{item.diseaseDetail.currentTreatmentDetail} </td>
                    </tr>
                    <tr>
                      <td>Doctor’s advice for further process</td>
                      <td>{item.diseaseDetail.doctorAdviceForFurtherProcess} </td>
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
              </div>
            )}
          </div>
        );
      })}
     </div>
    </>
  );
};

export default RegisteredPatients;

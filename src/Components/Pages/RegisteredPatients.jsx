import React, { useState, useEffect } from "react";
import "../../Assets/Styles/RegisteredPatients.css";
import check from "../../Assets/Images/check.png";
import error from "../../Assets/Images/error.png";
import axios from "axios";
import { Link } from "react-router-dom";
import editlogo from "../../Assets/Images/icons8-edit-text-file-50.png"

const RegisteredPatients = () => {
  const [file, setFile] = useState(null);
  // const [showDetails, setShowDetails] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [data, setData] = useState([]);
  const [activePatientId, setActivePatientId] = useState(false);
  const [activeStatusId, setActiveStatusId] = useState(false);
  const [bgColor, setBgColor] = useState("");
  // const [border, setBorder] = useState("");
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const baseURL = "http://13.126.14.109:4000/patient/getpatient";

  useEffect(() => {
    axios.get(baseURL).then((responce) => {
      console.log(responce.data.result);

      setData(responce.data.result);
    });

    // getData();
  }, []);

  const handleShowDetails = (index) => {
    // setShowDetails(!showDetails);
    // console.log("index", _id);
    setShowStatus(false);
    setActivePatientId(data[index].patientDetails._id);
    setActiveStatusId(null);
    setActiveCardIndex(index);
    let grey = '#E7E7E7 ';
    setBgColor(grey);
    let border = "5px solid green"
    // setBorder(border)
    
  };

  const handleShowStatus = (index) => {
    console.log("Show Status clicked");
    setShowStatus(!showStatus);
    // setShowDetails(false);
    setActivePatientId(null);
    setActiveStatusId(data[index]._id);
    setActiveCardIndex(index);
  };

  const handleSidebarClose = () => {
    // setShowDetails(false);
    setShowStatus(false);
    setActivePatientId(false);
    setActiveStatusId(false);
    setActiveCardIndex("");
  };

  return (
    <>
      <div className="maincontainer">
        {data.map((item, index) => {
          const isDetailsActive = activePatientId === item.patientDetails._id;
          const isStatusActive = activeStatusId === item._id;
          const isCardActive = activeCardIndex === index;
          const cardBackgroundColor = isCardActive ? "#E7E7E7" : "";
          const cardBorder = isCardActive ? "5px solid green" : "";
          
          return (
            <div className="patient-card" style={{background: cardBackgroundColor , border: cardBorder}} key={index}>
              <div className="patient-data">
                <h6 className="card-patient-data">ID: {item.patientDetails._id}</h6>
                <h6 className="card-patient-data">Name: {item.patientDetails.name} </h6>
                <h6 className="card-patient-data">Gender: {item.patientDetails.sex} </h6>
                <h6 className="card-patient-data">Age: {item.patientDetails.age} </h6>

                <p>
                  {file ? (
                    <div className="file-upload-or-not">
                      <img
                        src={check}
                        alt="File Uploaded"
                        className="file-upload-logo"
                      />
                      <span className="card-file-upload">Documents uploaded</span>
                    </div>
                  ) : (
                    <div>

                    <div className="file-upload-or-not">
                      <img
                        src={error}
                        alt="File Not Uploaded"
                        className="file-upload-logo"
                        />
                      <span className="card-file-not-found">Documents not uploaded</span>
                      
                    </div>
                    <div className="data-btn">
                        <button
                          className="btn-register-more"
                          onClick={() =>
                            handleShowDetails(index)
                          }
                        >
                          More Info
                        </button>
                        <button
                          className="btn-register-status"
                          onClick={() => handleShowStatus(index)}
                        >
                          Status
                        </button>
                      </div>
                        </div>
                  )}
                </p>
              </div>

              {isDetailsActive && (
                <div className="patient-details-sidebar">
                  <span className="close-icon" onClick={handleSidebarClose}>
                    ❌
                  </span>
                  <h2 className="table-heading">Patient Details <Link className="btn-register-edit"><img src={editlogo} alt="form edit" /></Link></h2>
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

                  <h2 className="table-heading">Family Details</h2>
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

                  <h2 className="table-heading">Care Taker</h2>
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

                  <h2 className="table-heading">Disease Details</h2>
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
                        <td>
                          {item.diseaseDetail.doctorAdviceForFurtherProcess}{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h2 className="table-heading">Other Details</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Registered Date</td>
                        <td>{item.diseaseDetail.name}</td>
                      </tr>
                      <tr>
                        <td>Created by </td>
                        <td>{item.diseaseDetail.diagnoseDate} </td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{item.diseaseDetail.diagnoseBy}</td>
                      </tr>
                      {/* <tr>
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
                        <td>
                          {item.diseaseDetail.doctorAdviceForFurtherProcess}{" "}
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                  <h2 className="table-heading">Scheme/Hospital Details</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Scheme</td>
                        <td>Sample Scheme</td>
                      </tr>
                      <tr>
                        <td>Hospital </td>
                        <td>Sample Hospital </td>
                      </tr>
                      {/* <tr>
                        <td>Status</td>
                        <td>{item.diseaseDetail.diagnoseBy}</td>
                      </tr> */}
                      {/* <tr>
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
                        <td>
                          {item.diseaseDetail.doctorAdviceForFurtherProcess}{" "}
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              )}

              {isStatusActive && (
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
                        <td>{item.patientDetails._id}</td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>{item.patientDetails.name}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{item.patientDetails.sex}</td>
                      </tr>
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

import React, { useState, useEffect, useRef } from "react";
import "../../Assets/Styles/RegisteredPatients.css";

import axios from "axios";
import {  useParams } from "react-router-dom";
import UploadDocuments from "../UploadDocuments";
import ViewMMH from "../ViewMMH";
import { BsThreeDotsVertical } from "react-icons/bs";


import MMH from "../MMH";
import CloseApplication from "../CloseApplication";
import PDFDownload from "./PDFDownload";

import countries from "../../common/CommonObj";
import { Dropdown } from "react-bootstrap";
import BaseURL from "../../common/Api";

const RegisteredPatients = () => {

  const [showStatus, setShowStatus] = useState(false);
  const [data, setData] = useState([]);
  const [activePatientId, setActivePatientId] = useState(false);
  const [activeStatusId, setActiveStatusId] = useState(false);
  const [activeDocumentId, setActiveDocumentId] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { cardStatus } = useParams();
  const [loading, setLoading] = useState(false);

  const pdfRefs = data.map(() => React.createRef());
  const baseURL =
    `${BaseURL}/patient/getpatient`;

  const pdfRef = useRef();

  useEffect(() => {
    let isMounted = true;

    axios.get(baseURL).then((response) => {
      if (isMounted) {
        console.log(response.data.result);
        setData(response.data.result);
        setFilteredData(response.data.result.reverse());
      }
    });

    return () => {
      isMounted = false;
    };
  }, [cardStatus]);

  useEffect(() => {
    // Set the initial search term based on the condition (params)
    if (cardStatus === "documentsUploaded") {
      setSearchTerm("Documents Uploaded");
    } else if (cardStatus === "scheme&hospital") {
      setSearchTerm("Scheme & Hospital Selected");
    } else if (cardStatus === "pending") {
      setSearchTerm("Patient Registered");
    }
  }, [cardStatus]);

  useEffect(() => {
    // Update filtered data when search term changes
    const filteredResults = data.filter((item) => {
      const searchTermLowerCase = searchTerm.toLowerCase();

      return (
        item.patientDetails.name.toLowerCase().includes(searchTermLowerCase) ||
        item.patientID.toLowerCase().includes(searchTermLowerCase) ||
        item.status.toLowerCase().includes(searchTermLowerCase)
        // Add more fields to search if needed
        // ...
      );
    });

    setFilteredData(filteredResults);
  }, [searchTerm, data]);

  const handleShowDetails = (index) => {
    console.log("Clicked More Info button for index:", index);
    console.log("Patient ID:", filteredData[index].patientDetails._id);
    // ... other relevant log statements

    setShowStatus(false);
    setActivePatientId(filteredData[index].patientDetails._id);
    setActiveStatusId(null);
    setActiveCardIndex(index);
    setActiveDocumentId(null);
  };

  const handleShowStatus = (index) => {
    setShowStatus(!showStatus);
    // setShowDetails(false);
    setActivePatientId(null);
    setActiveStatusId(filteredData[index]._id);
    setActiveDocumentId(null);
    setActiveCardIndex(index);
  };
  const handleShowDocument = (index) => {
    setShowStatus(!showStatus);
    // setShowDetails(false);
    setActivePatientId(null);
    setActiveStatusId(null);
    setActiveDocumentId(filteredData[index]._id);
    setActiveCardIndex(index);
  };

  const handleSidebarClose = () => {
    // setShowDetails(false);
    setShowStatus(false);
    setActivePatientId(false);
    setActiveStatusId(false);
    setActiveDocumentId(false);
    setActiveCardIndex("");
  };
  const getStateName = (index) => {
    if (index >= 0 && index < countries.length) {
      return countries[index].state;
    }
    return ""; // Return an empty string or any default value if the index is out of bounds
  };

  //delete patient logic
  const handleDeletePatient = async (patientId) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "⚠️Are you sure you want to delete this patient?"
    );
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Check if the user confirmed the deletion
    if (isConfirmed) {
      try {
        // Make an HTTP request to delete the patient
        const response = await axios.delete(
          `${BaseURL}/patient/${patientId}`
        );

        // Log the response or handle it based on your requirements
        console.log("Delete Patient Response:", response.data);

        // After successful deletion, update the state without making another request
        setData((prevData) =>
          prevData.filter((patient) => patient._id !== patientId)
        );

        // Optionally, you can also update the filtered data
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter((patient) => patient._id !== patientId)
        );
      } catch (error) {
        console.error("Error deleting patient:", error);
        // Handle the error, show a message, etc.
      }
    } else {
      // The user clicked "Cancel", do nothing or show a message
      console.log("Deletion canceled");
    }
  };

  console.log(data);

  const handleEditPatient = (patientId) => {
    // Handle edit patient logic (e.g., navigate to edit page)
    console.log("Edit Patient ID:", patientId);
    window.location.href = `/editPatient/${patientId}`;
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      <div className="img-main"></div>
      <div className="search-bar group">
        <input
          type="text"
          placeholder="Search patient"
          value={searchTerm}
          className="input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* <img src={imgView} alt="" /> */}
      <div className="maincontainer" ref={pdfRef}>
        {filteredData.map((item, index) => {
          const isDetailsActive = activePatientId === item.patientDetails._id;
          const isCloseActive = activeStatusId === item._id;
          const isDocumentActive = activeDocumentId === item._id;
          const isCardActive = activeCardIndex === index;
          const cardBackgroundColor = isCardActive ? "#transform" : "";
          const cardBorder = isCardActive ? "3px solid #a4c639" : "";
          console.log("isDetailsActive", isDetailsActive);
          const statusColor =
            item.status === "Documents Uploaded"
              ? "green"
              : "" ||
                item.status === "Application Closed" ||
                item.status === "Closed-Patient Rejected" ||
                item.status === "Closed-Civil Hospital" ||
                item.status === "Closed-Ayushman Bharat" ||
                item.status === "Closed-Private" ||
                item.status === "Closed-MJPJA" ||
                item.status === "Closed-Other"
              ? "red"
              : "" || item.status === "Pending"
              ? "orange"
              : "" || item.status === "Active"
              ? "green"
              : "";
          const statusText =
            item.status === "Documents Uploaded" ? "bold" : "bold";

          return (
            <div
              id={`card-${index + 1}`}
              className="patient-card"
              style={{ background: cardBackgroundColor, border: cardBorder }}
              key={index}
              ref={pdfRefs[index]}
            >
              <div className="patient-data">
                <div class="table-wrapper">
                  <table className="patient-table" style={{ border: "none" }}>
                    <tbody>
                      <tr>
                        <div className="patient-id">
                          Patient ID: <br />
                          <br />
                          <span className="patientid">{item.patientID}</span>
                        </div>

                        <div className="status-bar">
                          <>Status:</>
                          <div
                            className="cardStatus"
                            style={{
                              fontSize: "16px",
                              color: statusColor,
                              fontWeight: statusText,
                            }}
                          >
                            {item.status}
                          </div>
                        </div>
                      </tr>

                      <tr>
                        <td style={{ border: "none", width: "100%" }}>
                          <div className="DiseseaNameHighLight">
                            <span style={{ border: "none", margin: "0px" }}>
                              Disease Name:
                            </span>
                            <span className="diseaseName">
                              {item.diseaseDetail.name}
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: "none" }}>
                          Patient Name: <span>{item.patientDetails.name}</span>
                        </td>

                        {/* <td style={{ border: "none" }}>
                          
                        </td> */}
                      </tr>

                      <tr>
                        <td style={{ border: "none" }}>
                          Care Taker Name: <span> {item.careTaker.name}</span>
                        </td>
                        <td style={{ border: "none" }}> </td>
                      </tr>
                      <tr>
                        <td style={{ border: "none" }}>
                          Care Taker Mobile No:{" "}
                          <span className="careTakerNum">
                            {item.careTaker.mobile1}
                          </span>
                        </td>
                        <td style={{ border: "none" }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={{ marginBottom: "0px" }}>
                  {/* {files.length > 0 ? (
                    <div className="file-upload-or-not">
                      <img
                        src={check}
                        alt="Files Uploaded"
                        className="file-upload-logo"
                      />
                      <span className="card-file-upload">
                        {files.length}{" "}
                        {files.length === 1 ? "Document" : "Documents"} uploaded
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="file-upload-or-not">
                        <img
                          src={error}
                          alt="Files Not Uploaded"
                          className="file-upload-logo"
                        />
                        <span className="card-file-not-found">
                          Documents not uploaded
                        </span>
                      </div>
                    </div>
                  )} */}
                </p>

                <div className="dots">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id={`dropdown-${index}`}>
                      <BsThreeDotsVertical className="droupdown-main" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleDeletePatient(item._id)}
                      >
                        Delete Patient
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleEditPatient(item._id)}
                      >
                        Edit Patient
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <PDFDownload item={item} />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div className="data-btn">
                  <button
                    className="btn-register-more"
                    onClick={() => handleShowDetails(index)}
                  >
                    More Info
                  </button>

                  {item.status !== "Closed-Patient Rejected" &&
                    item.status !== "Closed-Civil" &&
                    item.status !== "Closed-Ayushman Bharat" &&
                    item.status !== "Closed-Private" &&
                    item.status !== "Closed-MJPJA" &&
                    item.status !== "Closed-Other" && (
                      <>
                        <button
                          className="btn-register-status"
                          onClick={() => handleShowDocument(index)}
                        >
                          Upload Documents
                        </button>
                        <button
                          className="btn-register-status"
                          onClick={() => handleShowStatus(index)}
                        >
                          Close Application
                        </button>
                      </>
                    )}

                  {/* <button
                    className="btn-download-pdf"
                    onClick={() => handleDownloadPDF(index, item.patientID)}
                  >
                    Download MMH-Form
                  </button> */}
                  {/* <DeletePatient currentItem={item._id}/> */}
                </div>
              </div>

              {isDetailsActive && (
                <div className="patient-details-sidebar">
                  <span className="close-icon" onClick={handleSidebarClose}>
                    ❌
                  </span>
                  <h2 className="table-heading">
                    Patient Details{" "}
                    {/* <Link className="btn-register-edit">
                      <img src={editlogo} alt="form edit" />
                    </Link> */}
                  </h2>
                  <table>
                    <tbody>
                      <tr>
                        <td>Patient Name</td>
                        <td>{item.patientDetails.name} </td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{item.patientDetails.sex} </td>
                      </tr>
                      <tr>
                        <td>Age</td>
                        <td>{item.patientDetails.age} </td>
                      </tr>
                      <tr>
                        <td>Mobile No.</td>
                        <td>{item.patientDetails.mobile} </td>
                      </tr>
                      <tr>
                        <td>Aadhar No.</td>
                        <td>{item.patientDetails.aadhar} </td>
                      </tr>
                      <tr>
                        <td>RationCard No.</td>
                        <td>
                          {" "}
                          <h6 className="diseaseName">
                            {item.patientDetails.rationcardnumber}{" "}
                          </h6>
                        </td>
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
                        <td>{getStateName(item.patientDetails.state)}</td>
                      </tr>
                    </tbody>
                  </table>

                  <h2 className="table-heading">Family Details</h2>
                  <table>
                    <thead>
                      <th style={{ border: "1px solid black" }}>Sr.No.</th>
                      <th style={{ border: "1px solid black" }}>
                        {" "}
                        Family Member
                      </th>
                      <th style={{ border: "1px solid black" }}>Relation</th>
                      <th style={{ border: "1px solid black" }}>Age</th>
                      <th style={{ border: "1px solid black" }}>Occupation</th>
                      <th style={{ border: "1px solid black" }}>
                        Monthly Income
                      </th>
                    </thead>
                    <tbody>
                      {item.familyDetail.map((familyMember, familyIndex) => (
                        <tr key={familyIndex}>
                          <td>{familyIndex + 1}</td>
                          <td>{familyMember.name}</td>
                          <td>{familyMember.relation}</td>
                          <td>{familyMember.age}</td>
                          <td>{familyMember.occupation}</td>
                          <td>{familyMember.monthlyIncome}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h2 className="table-heading">Care Taker</h2>
                  <table>
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
                        <td>Investigation Done 1</td>
                        <td>{item.diseaseDetail.investigationDone1}</td>
                      </tr>
                      <tr>
                        <td>Investigation Done 2</td>
                        <td>{item.diseaseDetail.investigationDone2}</td>
                      </tr>
                      <tr>
                        <td>Investigation Done 3</td>
                        <td>{item.diseaseDetail.investigationDone3}</td>
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
                    <tbody>
                      <tr>
                        <td>Registered Date</td>
                        <td>{item.registeredDate}</td>
                      </tr>
                      <tr>
                        <td>Created by </td>
                        <td>{item.createdBy} </td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{item.status}</td>
                      </tr>
                    </tbody>
                  </table>

                  {item.documents.length > 0 && (
                    <>
                      <h2 className="table-heading">Documents</h2>
                    </>
                  )}
                  <table>
                    <tbody>
                      {item.documents.map((document, documentIndex) => (
                        <tr key={documentIndex}>
                          <td>{document.imageName}</td>
                          <td className="uploadedDocuments">
                            <a href={document.imageUrl}>Download </a>
                            <img
                              src={document.imageUrl}
                              alt=""
                              style={{ width: "100px" }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {item.schemeName ? (
                    <MMH
                      item={item}
                      isDownloading={isDownloading}
                      pdfRef={pdfRef}
                    />
                  ) : (
                    item.status !== "Closed-Patient Rejected" &&
                    item.status !== "Closed-Civil" &&
                    item.status !== "Closed-Ayushman Bharat" &&
                    item.status !== "Closed-Private" &&
                    item.status !== "Closed-MJPJA" &&
                    item.status !== "Closed-Other" && (
                      <ViewMMH currentItem={item._id} />
                    )
                  )}
                </div>
              )}

              {isCloseActive && (
                <CloseApplication
                  handleSidebarClose={handleSidebarClose}
                  currentItem={item._id}
                  index={index}
                />
              )}

              {isDocumentActive && (
                <UploadDocuments
                  currentItem={item._id}
                  onClose={handleSidebarClose}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RegisteredPatients;

import React, { useState, useEffect, useRef } from "react";
import ReactToPdf from "react-to-pdf";
import "../../Assets/Styles/RegisteredPatients.css";
import check from "../../Assets/Images/check.png";
import error from "../../Assets/Images/error.png";
import axios from "axios";
import { Link } from "react-router-dom";
import editlogo from "../../Assets/Images/icons8-edit-text-file-50.png";
import UploadDocuments from "../UploadDocuments";
import ViewMMH from "../ViewMMH";
import { Document, Page, pdfjs } from "react-pdf";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import generatePDF from "react-to-pdf";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";


const RegisteredPatients = () => {
  const [files, setFiles] = useState([]);
  const [document, setDocument] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // const [showDetails, setShowDetails] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [data, setData] = useState([]);
  const [activePatientId, setActivePatientId] = useState(false);
  const [activeStatusId, setActiveStatusId] = useState(false);
  const [activeDocumentId, setActiveDocumentId] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [refToDownload, setRefToDownload] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [imgView, setImgView] = useState();

  const doc = new jsPDF();

  const pdfRefs = data.map(() => React.createRef());
  const baseURL = "http://13.126.14.109:4000/patient/getpatient";

  const pdfRef = useRef();
  const options = {
    orientation: "portrait",
    // Add other options as needed
  };
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
    setActiveDocumentId(null);
  };

  const handleShowStatus = (index) => {
    setShowStatus(!showStatus);
    // setShowDetails(false);
    setActivePatientId(null);
    setActiveStatusId(data[index]._id);
    setActiveDocumentId(null);
    setActiveCardIndex(index);
  };
  const handleShowDocument = (index) => {
    setShowStatus(!showStatus);
    // setShowDetails(false);
    setActivePatientId(null);
    setActiveStatusId(null);
    setActiveDocumentId(data[index]._id);
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

  const handleCancelFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // const handleDownloadPDF = async (index, id) => {
  //   try {
  //     setIsDownloading(true);

  //     // Create a new jsPDF instance
  //     const doc = new jsPDF();

  //     // Get the reference to the specific card using the ref
  //     const cardRef = pdfRefs[index].current;

  //     // Check if the card reference is available
  //     if (cardRef) {
  //       // Use html2canvas to capture the card content as an image
  //       const canvas = await html2canvas(cardRef);

  //       // Convert the canvas to a data URL
  //       const imgData = canvas.toDataURL("image/png");
  //       console.log(imgData);
  //       setImgView(imgData);

  //       // Add the image to the PDF
  //       // doc.addImage(imgData, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);

  //       // // Save the PDF with a specific filename
  //       // doc.save(`${id}_patient_details.pdf`);
  //     } else {
  //       console.error("Unable to get the target element.");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };
  
  // const handleDownloadPDF = (index) => {
  //   const doc = new jsPDF();
  //   const pdfElement = pdfRefs[index].current;

  //   // Ensure that the content is ready before trying to generate PDF
  //   if (pdfElement) {
  //     // Calculate width and height based on content size
  //     const contentWidth = pdfElement.clientWidth;
  //     const contentHeight = pdfElement.clientHeight;

  //     // Set PDF dimensions
  //     doc.internal.pageSize.setWidth(contentWidth);
  //     doc.internal.pageSize.setHeight(contentHeight);

  //     // Generate PDF
  //     doc.html(pdfElement, {
  //       callback: function (pdf) {
  //         pdf.save("patient_details.pdf");
  //       },
  //       x: 0,
  //       y: 0,
  //     });
  //   }
  // };

  const handleDownloadPDF = (index) => {
    const customPageSize = { width: 300, height: 400 }; // Set your custom page size here
    const pdfElement = pdfRefs[index].current;
  
    // Ensure that the content is ready before trying to generate PDF
    if (pdfElement) {
      // Calculate content dimensions
      const contentWidth = pdfElement.clientWidth;
      const contentHeight = pdfElement.clientHeight;
  
      // Calculate scale factor to fit content within the page
      const scaleFactor = Math.min(customPageSize.width / contentWidth, customPageSize.height / contentHeight);
  
      // Set PDF dimensions
      const pdfWidth = contentWidth * scaleFactor;
      const pdfHeight = contentHeight * scaleFactor;
  
      // Convert HTML content to a data array using html2pdf
      html2pdf(pdfElement, {
        margin: 10,
        filename: "patient_details.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      }).from(pdfElement).save();
    }
  };
  
  

  return (
    <>
      <img src={imgView} alt="" />
      <div className="maincontainer">
        {data.map((item, index) => {
          const isDetailsActive = activePatientId === item.patientDetails._id;
          const isStatusActive = activeStatusId === item._id;
          const isDocumentActive = activeDocumentId === item._id;
          const isCardActive = activeCardIndex === index;
          const cardBackgroundColor = isCardActive ? "#E7E7E7" : "";
          const cardBorder = isCardActive ? "3px solid #a4c639" : "";

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
                        <td style={{ border: "none" }}>ID:</td>
                        <td style={{ border: "none" }}>{item.patientID}</td>
                      </tr>
                      <tr>
                        <td style={{ border: "none" }}>Name:</td>
                        <td style={{ border: "none" }}>
                          {item.patientDetails.name}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: "none" }}>Gender:</td>
                        <td style={{ border: "none" }}>
                          {item.patientDetails.sex}
                        </td>
                      </tr>
                      <tr className="patient-table-row">
                        <td style={{ border: "none" }}>Age:</td>
                        <td style={{ border: "none" }}>
                          {item.patientDetails.age}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: "none" }}>Aadhar No:</td>
                        <td style={{ border: "none" }}>
                          {item.patientDetails.aadhar}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  {files.length > 0 ? (
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
                  )}
                </p>

                {isDownloading === false ? (
                  <div className="data-btn">
                    <button
                      className="btn-register-more"
                      onClick={() => handleShowDetails(index)}
                    >
                      More Info
                    </button>
                    <button
                      className="btn-register-status"
                      onClick={() => handleShowStatus(index)}
                    >
                      Status
                    </button>
                    <button
                      className="btn-register-status"
                      onClick={() => handleShowDocument(index)}
                    >
                      Upload Documents
                    </button>
                    <button
                    className="btn-download-pdf"
                    onClick={() => handleDownloadPDF(index)}
                  >
                    Download PDF
                  </button>
                  </div>
                ) : null}
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
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                      </tr>
                    </thead>
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
                      <ViewMMH />
                    </tbody>
                  </table>
                </div>
              )}

              {isStatusActive && (
                <div className="patient-status-sidebar">
                  <span className="close-icon" onClick={handleSidebarClose}>
                    ❌
                  </span>
                  <h2>Status</h2>
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
                      {/* <tr>
                        <td>Documents</td>
                        <td>
                          {files.map((file, idx) => (
                            <div key={idx}>
                              <img
                                src={check}
                                alt="File Uploaded"
                                className="file-upload-logo"
                              />
                              <span className="file-upload">
                                File {idx + 1} uploaded{" "}
                                <button onClick={() => handleCancelFile(idx)}>
                                  Cancel
                                </button>
                              </span>
                            </div>
                          ))}
                          <input
                            type="file"
                            onChange={(e) =>
                              setFiles([...files, e.target.files[0]])
                            }
                            multiple
                          />
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              )}
              {isDocumentActive && <UploadDocuments />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RegisteredPatients;

import React, { useState } from "react";
import "../Assets/Styles/UploadDocuments.css";

const UploadDocuments = () => {
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

  const handleDocumentChange = (index, event) => {
    const { name, value } = event.target;
    const newFiles = [...files];
    newFiles[index][name] = value;
    setFiles(newFiles);
  };

  const handleAddDocument = () => {
    setFiles([...files, { files: "", type: "" }]);
  };

  const handleDeleteDocument = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleFileChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index].files = event.target.files[0];
    setFiles(newFiles);
  };

  const handleSidebarClose = () => {
    setShowStatus(false);
    setActivePatientId(false);
    setActiveStatusId(false);
    setActiveDocumentId(false);
    setActiveCardIndex("");
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:5050/patient/657ecc7cd7f6ca684e609b95";

    try {
      const formData = new FormData();

      files.forEach((doc) => {
        formData.append("files", doc.files);
        formData.append("types[]", doc.type);
      });

      const response = await fetch(apiUrl, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Files uploaded successfully!");
      } else {
        console.error("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ position: "relative" }}>
        <h2>Documents</h2>
        {/* <span className="close-icon" onClick={handleSidebarClose}>
          ❌
        </span> */}
        <table>
          <thead>
            {/* <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr> */}
          </thead>
        </table>
        {files.map((doc, index) => (
          <div key={index}>
            <div className="patient-documents-sidebar">
              <table>
                <tr>
                  <td className="form-div">
                    <select
                  
                      className="form-input"
                      name="type"
                      value={doc.type}
                      onChange={(e) => handleDocumentChange(index, e)}
                    >
                      <option value="">select document</option>
                      <option value="Aadhar Card">Aadhar Card</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Election Card">Election Card</option>
                      <option value="Ration Card">Ration Card</option>
                      <option value="Income Certificate">
                        Income Certificate
                      </option>
                      <option value="MJP Scheme Card">MJP Scheme Card</option>
                      <option value="Ayushman Bharat Card">
                        Ayushman Bharat Card
                      </option>
                      <option value="Light Bill">Light Bill</option>
                      <option value="Telephone Bill">Telephone Bill</option>
                      <option value="Medical Insurance Due">
                        Medical Insurance Due
                      </option>
                      <option value="Passport">Passport</option>
                      <option value="Driving Licience">Driving Licience</option>
                      <option value="Hospital Estimate Letter">
                        Hospital Estimate Letter
                      </option>
                      <option value="Bank Pass Book">Bank Pass Book</option>
                      <option value="MC Tax Receipt">MC Tax Receipt</option>
                      <option value="Service Book">Service Book</option>
                      <option value="Pension Card">Pension Card</option>
                      <option value="Labour Card">Labour Card</option>
                      <option value="Student Scheme ID Card">
                        Student Scheme ID Card
                      </option>
                      <option value="Death Certificate of family head">
                        Death Certificate of family head
                      </option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="file"
                      name="files"
                      className="docInput"
                      value={doc.document}
                      onChange={(e) => handleFileChange(index, e)}
                    />
                    <button
                      type="button"
                      className="btn-docDelete"
                      onClick={() => handleDeleteDocument(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Add other rows for additional details */}
              </table>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn-docAdd"
          onClick={handleAddDocument}
        >
          Add Document
        </button>
        <button type="submit" className="btn-docSubmit">
          Submit
        </button>
      </form>
      
    </div>
  );
};

export default UploadDocuments;

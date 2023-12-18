import React, { useState } from "react";
import "../Assets/Styles/UploadDocuments.css";

const UploadDocuments = ({currentItem}) => {
  console.log("Top",currentItem);
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
  // Add this state variable
  const [otherDocumentType, setOtherDocumentType] = useState("");

  // const handleDocumentChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const newFiles = [...files];
  //   newFiles[index][name] = value;

  //   // If the selected option is "Other", update the otherDocumentType state
  //   if (value === "Other") {
  //     setOtherDocumentType(newFiles[index].otherType || "");
  //   }

  //   setFiles(newFiles);
  // };

  const handleDocumentChange = (index, event) => {
    const { name, value } = event.target;
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = {
        ...updatedFiles[index],
        [name]: value,
      };
  
      // If the selected document type is "Other," update otherType
      if (name === 'type' && value === 'Other') {
        updatedFiles[index] = {
          ...updatedFiles[index],
          otherType: '',
        };
      }
  
      // If the selected document type is not "Other," reset otherType
      if (name === 'type' && value !== 'Other') {
        updatedFiles[index] = {
          ...updatedFiles[index],
          otherType: undefined,
        };
      }
  
      // If the selected document type is not "Other," set imageName
      if (name === 'type' && value !== 'Other') {
        updatedFiles[index] = {
          ...updatedFiles[index],
          imageName: value,
        };
      }
  
      return updatedFiles;
    });
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
    console.log("sgdhgshdgsd",currentItem);
    const apiUrl = "http://13.126.14.109:4000/patient/"+currentItem;

    try {
      const formData = new FormData();

      files.forEach((doc) => {
        formData.append("files", doc.files);
        formData.append("types[]", doc.type);
      });

      const response = await fetch(apiUrl, {
        method: "PUT",
        body: formData,
        documents:[]
        
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
      <form onSubmit={(event) => handleSubmit(event, currentItem)} style={{ position: "relative" }}>
        <h2>Documents</h2>
        <img src="" alt="" />
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
            {console.log("sjkdhsaj",doc.type)}
            <div className="patient-documents-sidebar">
              <table>
                <tr>
                  <td className="form-div">
                    <select
                      className="form-input1"
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
                      <option value="Other">Other</option>
                    </select>
                    {doc.type === "Other" && (
                      <input
                        type="text"
                        name="otherType"
                        placeholder="Type here..."
                        value={doc.otherType || ""}
                        onChange={(e) => handleDocumentChange(index, e)}
                      />
                    )}
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

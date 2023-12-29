import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Assets/Styles/UploadDocuments.css";
import check from "../Assets/Images/check.png";
import error from "../Assets/Images/error.png";
import { useNavigate } from "react-router-dom";

const UploadDocuments = ({ currentItem, onClose }) => {

  const navigate =useNavigate()
  console.log("Top", currentItem);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [document, setDocument] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showStatus, setShowStatus] = useState(false);
  const [data, setData] = useState([]);
  const [activePatientId, setActivePatientId] = useState(false);
  const [activeStatusId, setActiveStatusId] = useState(false);
  const [activeDocumentId, setActiveDocumentId] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [otherDocumentType, setOtherDocumentType] = useState("");
  const [isUploadSuccess, setUploadSuccess] = useState(false);
  const [isAddSuccess, setAddSuccess] = useState(false);
  const [refresh, setRefresh]= useState(false)
  const storedUserType = localStorage.getItem("userType");
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleDocumentChange = (index, event) => {
    const { name, value } = event.target;
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = {
        ...updatedFiles[index],
        [name]: value,
      };

      // If the selected document type is "Other," update otherType
      if (name === "type" && value === "Other") {
        updatedFiles[index] = {
          ...updatedFiles[index],
          otherType: "",
        };
      }

      // If the selected document type is not "Other," reset otherType
      if (name === "type" && value !== "Other") {
        updatedFiles[index] = {
          ...updatedFiles[index],
          otherType: undefined,
        };
      }

      // If the selected document type is not "Other," set imageName
      if (name === "type" && value !== "Other") {
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
    setAddSuccess(true);
    setUploadSuccess(false);
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

  const showToast = (message, type) => {
    toast[type](message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    
    const updateUrl = "https://mmh-jajh.onrender.com/patient/" + currentItem;

    try {
      const formData = new FormData();

      // Append status to formData
      formData.append("status", "Documents Uploaded");

      // Append files, types, and doc.type
      files.forEach((doc) => {
        formData.append("files", doc.files);
        formData.append("types[]", doc.type);

        // Append doc.type directly to formData
        formData.append("docType", doc.type);
        console.log("hgsagdsha", doc.type);
      });

      const response = await fetch(updateUrl, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        
        console.log("gshjgdsah",response.data);
        setUploadSuccess(false);
        setAddSuccess(false);
       
        showToast("Document uploaded successfully!", "success");

        setTimeout(() => {
          showToast("Document uploaded successfully!", "success")
          onClose();
          window.location.reload();
        }, 1000); // Adjust the delay time as needed
  
        handleSidebarClose();
        // onClose();

      } else {
        setUploadSuccess(false);
        setAddSuccess(false);
        showToast("Failed to upload documents.", "error");
      }
      {(storedUserType === "Operator" ? (<>{navigate("/opRegistered-patients")}</>): (<>{navigate("/registered-patients")}</>))}
    } catch (error) {
      setUploadSuccess(false);
      setAddSuccess(false);
      setTimeout(() => {
      showToast("Error uploading documents.", "error");
    }, 500); // Adjust the delay time as needed
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      {files.length > 0 ? (
        <div className="file-upload-or-not">
          <img src={check} alt="Files Uploaded" className="file-upload-logo" />
          <span className="card-file-upload">
            {files.length} {files.length === 1 ? "Document" : "Documents"} Selected
          </span>
        </div>
      ) : (
        <div className="file-upload-or-not">
          <img src={error} alt="Files Not Uploaded" className="file-upload-logo" />
          <span className="card-file-not-found">
            {files.length === 0 ? "No documents Selected" : "Documents not uploaded"}
          </span>
        </div>
      )}

      {/* <form onSubmit={handleSubmit} style={{ position: "relative" }}>
        <h2>Documents</h2>
        <img src="" alt="" /> */}
      
        
      <form onSubmit={(event) => handleSubmit(event, currentItem)}>
        <h2>Documents</h2>

        {files.map((doc, index) => (
          <div key={index}>
            {console.log("sjkdhsaj", doc.type)}
            <div className="patient-documents-sidebar">
              <table>
                <tr className="upload-input-tr">
                  <td className="form-div">
                    <select
                      className="form-input1"
                      name="type"
                      value={doc.type}
                      onChange={(e) => handleDocumentChange(index, e)}
                    >
                      <option value="">select document</option>
                      <option value="Application Form">MMH-Form</option>
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
              </table>
            </div>
          </div>
        ))}

        <button type="button" className="btn-docAdd" onClick={handleAddDocument}>
          Add Document
        </button>
        <button type="submit" className="btn-docSubmit" disabled = {!files.length > 0 }>
          Submit
        </button>
      </form>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default UploadDocuments;

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Assets/Styles/UploadDocuments.css";
import { MdCheckCircle, MdErrorOutline, MdAdd, MdUpload, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BaseURL from "../common/Api";

const UploadDocuments = ({ currentItem, onClose }) => {

  const navigate = useNavigate()
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
  const [refresh, setRefresh] = useState(false)
  const storedUserType = localStorage.getItem("userType");
  const [loading, setLoading] = useState(false); // State to manage loading

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
    setLoading(true);


    const updateUrl = `${BaseURL}/patient/` + currentItem;

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

        console.log("gshjgdsah", response.data);
        setUploadSuccess(false);
        setAddSuccess(false);

        showToast("Document uploaded successfully!", "success");

        setTimeout(() => {
          showToast("Document uploaded successfully!", "success")
          onClose();
          window.location.reload();
        }, 800); // Adjust the delay time as needed

        handleSidebarClose();
        // onClose();

      } else {
        setUploadSuccess(false);
        setAddSuccess(false);
        showToast("Failed to upload documents.", "error");
      }
      { (storedUserType === "Operator" ? (<>{navigate("/opRegistered-patients")}</>) : (<>{navigate("/registered-patients")}</>)) }
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
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      <div className="rpm-upload-section">
        {files.length > 0 ? (
          <div className="file-upload-or-not" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", color: "#1e4d26", fontWeight: "600" }}>
            <MdCheckCircle style={{ fontSize: "1.5rem" }} />
            <span>{files.length} {files.length === 1 ? "Document" : "Documents"} Selected</span>
          </div>
        ) : (
          <div className="file-upload-or-not" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", color: "#e53e3e", fontWeight: "600" }}>
            <MdErrorOutline style={{ fontSize: "1.5rem" }} />
            <span>No documents selected</span>
          </div>
        )}

        <form onSubmit={(event) => handleSubmit(event, currentItem)}>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
            {files.map((doc, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <select
                    className="npt-input"
                    name="type"
                    value={doc.type}
                    onChange={(e) => handleDocumentChange(index, e)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  >
                    <option value="">Select Document Type</option>
                    <option value="Application Form">MMH-Form</option>
                    <option value="Aadhar Card">Aadhar Card</option>
                    <option value="PAN Card">PAN Card</option>
                    <option value="Election Card">Election Card</option>
                    <option value="Ration Card">Ration Card</option>
                    <option value="Income Certificate">Income Certificate</option>
                    <option value="MJP Scheme Card">MJP Scheme Card</option>
                    <option value="Ayushman Bharat Card">Ayushman Bharat Card</option>
                    <option value="Light Bill">Light Bill</option>
                    <option value="Telephone Bill">Telephone Bill</option>
                    <option value="Medical Insurance Due">Medical Insurance Due</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving Licience">Driving Licience</option>
                    <option value="Hospital Estimate Letter">Hospital Estimate Letter</option>
                    <option value="Bank Pass Book">Bank Pass Book</option>
                    <option value="MC Tax Receipt">MC Tax Receipt</option>
                    <option value="Service Book">Service Book</option>
                    <option value="Pension Card">Pension Card</option>
                    <option value="Labour Card">Labour Card</option>
                    <option value="Student Scheme ID Card">Student Scheme ID Card</option>
                    <option value="Death Certificate of family head">Death Certificate of family head</option>
                    <option value="Other">Other</option>
                  </select>

                  {doc.type === "Other" && (
                    <input
                      type="text"
                      name="otherType"
                      placeholder="Type here..."
                      className="npt-input"
                      value={doc.otherType || ""}
                      onChange={(e) => handleDocumentChange(index, e)}
                      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                    />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <input
                    type="file"
                    name="files"
                    className="npt-input"
                    style={{ width: "100%", padding: "7px", cursor: "pointer", background: "#fff", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                    onChange={(e) => handleFileChange(index, e)}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteDocument(index)}
                  style={{ background: "#fee2e2", color: "#e53e3e", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  title="Delete Document"
                >
                  <MdDelete style={{ fontSize: "1.2rem" }} />
                </button>

              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <button
              type="button"
              onClick={handleAddDocument}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", padding: "12px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
            >
              <MdAdd style={{ fontSize: "1.2rem" }} /> Add Document
            </button>
            <button
              type="submit"
              disabled={!files.length > 0}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: files.length > 0 ? "#1e4d26" : "#cbd5e1", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "600", cursor: files.length > 0 ? "pointer" : "not-allowed" }}
            >
              <MdUpload style={{ fontSize: "1.2rem" }} /> Submit Documents
            </button>
          </div>
        </form>
        <ToastContainer autoClose={3000} />
      </div>
    </>
  );
};

export default UploadDocuments;

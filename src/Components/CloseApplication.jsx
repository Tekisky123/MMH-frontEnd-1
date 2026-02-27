import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseURL from "../common/Api";
import { MdClose } from "react-icons/md";
import ConfirmModal from "./common/ConfirmModal";

const CloseApplication = ({ handleSidebarClose, currentItem, index }) => {
  const [files, setFiles] = useState(null);
  const storedUserType = localStorage.getItem("userType");
  const [loading, setLoading] = useState(false); // State to manage loading

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amountSaved: "",
    amountGivenByMMH: "",
    comments: "",
    patientfeedback: "",
    status: "",
    closedate: new Date().toLocaleDateString(),
    // Remove 'files' from here
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const confirmSubmission = async () => {
    setIsModalOpen(false);
    setLoading(true);

    const updateUrl = `${BaseURL}/patient/` + currentItem;

    try {
      const formDataWithImage = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithImage.append(key, value);
      });
      formDataWithImage.append("files", files); // Ensure correct handling for files

      const response = await axios.put(updateUrl, formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add any other headers you need, such as authorization headers
        },
      });

      // Assuming a successful response is status code 2xx
      if (response.status >= 200 && response.status < 300) {
        // Handle successful submission
        console.log("Form submitted successfully!");
        window.location.reload();
      } else {
        // Handle errors
        console.error("Error submitting form");
      }
      {
        storedUserType === "Operator" ? (
          <>{navigate("/opRegistered-patients")}</>
        ) : (
          <>{navigate("/registered-patients")}</>
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFiles(selectedImage);
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
      <form onSubmit={handleSubmit}>
        <div className="patient-status-sidebar" style={{ position: "relative", padding: "24px", background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <span className="close-icon" onClick={handleSidebarClose} style={{ position: "absolute", top: "16px", right: "16px", cursor: "pointer", fontSize: "1.5rem", color: "#64748b" }}>
            <MdClose />
          </span>
          <h2 style={{ fontSize: "1.5rem", color: "#1e4d26", marginBottom: "24px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>Close Application</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Amount Saved By Yojna */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Amount Saved By Yojna</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}>₹</span>
                <input
                  type="number"
                  name="amountSaved"
                  value={formData.amountSaved}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="npt-input"
                  style={{ width: "100%", padding: "10px 10px 10px 30px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Amount Given By M.M.H. */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Amount Given By M.M.H.</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}>₹</span>
                <input
                  type="number"
                  name="amountGivenByMMH"
                  value={formData.amountGivenByMMH}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="npt-input"
                  style={{ width: "100%", padding: "10px 10px 10px 30px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Comments */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Comments</label>
              <input
                type="text"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                className="npt-input"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
              />
            </div>

            {/* Patient Feedback */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Patient Feedback</label>
              <input
                type="text"
                name="patientfeedback"
                value={formData.patientfeedback}
                onChange={handleInputChange}
                className="npt-input"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
              />
            </div>

            {/* Upload Image */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Upload Receipt / File</label>
              <input
                type="file"
                name="files"
                onChange={handleImageChange}
                className="npt-input"
                style={{ width: "100%", padding: "8px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #cbd5e1", cursor: "pointer", boxSizing: "border-box" }}
              />
            </div>

            {/* Status */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Status <span style={{ color: "red" }}>*</span></label>
              <select
                name="status"
                value={formData.status}
                required
                onChange={handleInputChange}
                className="npt-input"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
              >
                <option value="">Select closing status</option>
                <option value="Closed-Patient Rejected">Closed-Patient Rejected</option>
                <option value="Closed-Civil Hospital">Closed-Civil Hospital</option>
                <option value="Closed-Ayushman Bharat">Closed-Ayushman Bharat</option>
                <option value="Closed-Private">Closed-Private Hospital</option>
                <option value="Closed-MJPJA">Closed-MJPJA</option>
                <option value="Closed-Other">Closed-Other</option>
              </select>

              {formData.status === "Closed-Other" && (
                <input
                  type="text"
                  name="otherType"
                  placeholder="Specify other reason..."
                  value={formData.otherType || ""}
                  onChange={handleInputChange}
                  className="npt-input"
                  style={{ width: "100%", padding: "10px", marginTop: "8px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                />
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="npt-btn npt-btn--primary"
              style={{ padding: "14px", fontSize: "1rem", fontWeight: "600", background: "#1e4d26", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", marginTop: "12px" }}
            >
              Close Case
            </button>

          </div>
        </div>
      </form>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Application Closure"
        message="Are you sure you want to permanently close this case? This action cannot be easily undone."
        confirmText="Yes, Close Case"
        cancelText="Cancel"
        onConfirm={confirmSubmission}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CloseApplication;

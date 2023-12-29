import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CloseApplication = ({ handleSidebarClose, currentItem, index }) => {
  const [files, setFiles] = useState(null);
  const storedUserType = localStorage.getItem("userType");
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

  const handleConfirmation = () => {
    return window.confirm("Are You Sure You Want To Close Case?");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleConfirmation()) {
      return; // User canceled submission
    }

    const updateUrl = "https://mmh-jajh.onrender.com/patient/" + currentItem;

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
      {(storedUserType === "Operator" ? (<>{navigate("/opRegistered-patients")}</>): (<>{navigate("/registered-patients")}</>))}
      
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
    <form onSubmit={handleSubmit}>
      <div className="patient-status-sidebar">
        <span className="close-icon" onClick={handleSidebarClose}>
          ❌
        </span>
        <h2>Close Application</h2>
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
          <tr>
              <td>Amount Saved By Yojna</td>
              <td>
                
                <input
                  type="number"
                  name="amountSaved"
                  value={formData.amountSaved}
                  onChange={handleInputChange}
                  placeholder=" ₹"
                />
                 
              </td>
            </tr>
          <tr>
              <td>Amount Given By M.M.H.</td>
              <td>
                
                <input
                  type="number"
                  name="amountGivenByMMH"
                  value={formData.amountGivenByMMH}
                  onChange={handleInputChange}
                  placeholder=" ₹"
                />
                 
              </td>
            </tr>
            <tr>
              <td>Comments</td>
              <td>
              <input
              type="text"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
            />
              </td>
            </tr>
            <tr>
              <td>Patient Feedback</td>
              <td>
              <input
              type="text"
              name="patientfeedback"
              value={formData.patientfeedback}
              onChange={handleInputChange}
            />
              </td>
            </tr>
            <tr>
        <td>Upload Image</td>
        <td>
          <input
            type="file"
            name="files"
            onChange={handleImageChange}
          />
        </td>
      </tr>
            <tr>
              <td>Status<span className="error-message">⁕</span></td>
              <td>
                <select name="status"
              className="form-input"
              value={formData.status}
              required
              onChange={handleInputChange}>
                  <option value="">select</option>
                  <option value="Closed-Patient Rejected">Closed-Patient Rejected</option>
                  <option value="Closed-Civil Hospital">Closed-Civil Hospital</option>
                  <option value="Closed-Ayushman Bharat">Closed-Ayushman Bharat</option>
                  <option value="Closed-Private">Closed-Private Hospital</option>
                  <option value="Closed-MJPJA">Closed-MJPJA</option>
                  <option value="Closed-Other">Closed-Other</option>
                </select>
                <br />
                {formData.status === "Closed-Other" && (
            <input
              type="text"
              name="otherType"
              placeholder="Type here..."
              value={formData.otherType || ""}
              onChange={handleInputChange}
            />
          )}
              </td>
            </tr>
          
          </tbody>
        </table>
        <button type="submit" className="btn-register-status btn-close-submit ">Submit</button>
      </div>
    </form>
  );
};

export default CloseApplication;

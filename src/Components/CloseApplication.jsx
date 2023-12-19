import React, { useState } from "react";
import axios from "axios";

const CloseApplication = ({ handleSidebarClose, currentItem, index }) => {
    const currDate = new Date().toLocaleDateString();
  
    const [formData, setFormData] = useState({
      amount: "",
      comments: "",
      patientfeedback: "",
      status: "",
      closedate: currDate,
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const updateUrl = "http://13.126.14.109:4000/patient/" + currentItem;
  
      try {
        const response = await axios.put(updateUrl, formData, {
          headers: {
            "Content-Type": "application/json",
            // Add any other headers you need, such as authorization headers
          },
        });
  
        // Assuming a successful response is status code 2xx
        if (response.status >= 200 && response.status < 300) {
          // Handle successful submission
          console.log("Form submitted successfully!");
        } else {
          // Handle errors
          console.error("Error submitting form");
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
              <td>Amount Saved</td>
              <td>
                ₹
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
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
              <td>Status</td>
              <td>
                <select name="status"
              className="form-input"
              value={formData.status}
              onChange={handleInputChange}>
                  <option value="">select</option>
                  <option value="Closed-Patient Not Reponded">Closed-Patient Not Reponded</option>
                  <option value="Closed-Civil">Closed-Civil</option>
                  <option value="Closed-Ayushman Bharat">Closed-Ayushman Bharat</option>
                  <option value="Closed-Private">Closed-Private</option>
                  <option value="Closed-MJPJA">Closed-MJPJA</option>
                  <option value="Closed-Other">Closed-Other</option>
                </select>
                {formData.status === "Closed-Other" && (
                      <input
                        type="text"
                        name="otherType"
                        placeholder="Type here..."
                        // value={formData.status || ""}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    )}
              </td>
            </tr>
            <tr>
              <td>Closing Date</td>
              <td>
              <input
              type="text"
              name="closedate"
              value={formData.closedate}
              readOnly
            />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CloseApplication;

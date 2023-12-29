import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const ViewMMH = ({ currentItem }) => {
  const navigate =useNavigate()
  const [schemeName, setSchemeName] = useState("");
  const [hospital, setHospital] = useState("");
  const [viewByMhh, setViewByMhh] = useState("");
  const [adviceByMhh, setAdviceByMhh] = useState("");
  const [proposeHelpByMhh, setProposeHelpByMhh] = useState("");
  const storedUserType = localStorage.getItem("userType");
  const [errors, setErrors] = useState({
    schemeName: "",
    hospital: "",
    viewByMhh: "",
    adviceByMhh: "",
    proposeHelpByMhh: "",
  });

  // Function to send data to the API using Axios
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const data = {
        schemeName,
        hospital,
        viewByMhh,
        adviceByMhh,
        proposeHelpByMhh,
        status: "Scheme & Hospital Selected",
      };
      var requiredFields = [
        "schemeName",
        "hospital",
        "proposeHelpByMhh",
      ];

      let hasError = false;
      requiredFields.forEach((field) => {
        if (
        !schemeName ||
        !hospital ||
        !proposeHelpByMhh
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: " ",
        }));
        hasError = true;
      }
      })

      if (!hasError) {
        const data = {
          schemeName,
        hospital,
        viewByMhh,
        adviceByMhh,
        proposeHelpByMhh,
        status: "Scheme & Hospital Selected",
        };

        // Assuming you have an API endpoint, replace 'yourApiEndpoint' with the actual endpoint
        const response = await axios.put(
          "https://mmh-jajh.onrender.com/patient/" + currentItem,
          data
        );

        // Handle the response from the API if needed
        console.log("API Response:", response.data);
        window.location.reload();
      }
      {(storedUserType === "Operator" ? (<>{navigate("/opRegistered-patients")}</>): (<>{navigate("/registered-patients")}</>))}
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="table-heading">Scheme/Hospital/MMH Guidance Plan</h2>
        <table>
          <tbody>
          <tr>
              <td>
                Scheme <span className="error-message">⁕</span>
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  name="schemeName"
                  value={schemeName}
                  onChange={(e) => setSchemeName(e.target.value)}
                />
                <div className="error-message">{errors.schemeName}</div>
              </td>
            </tr>
            <tr>
              <td>
                Hospital <span className="error-message">⁕</span>{" "}
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  name="hospital"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                />
                <div className="error-message">{errors.hospital}</div>
              </td>
            </tr>
            <tr>
              <td>
                View of M.M.H.
              </td>
              <td>
                <textarea
                  name="viewByMhh"
                  className="form-input"
                  cols="80"
                  rows="3"
                  value={viewByMhh}
                  onChange={(e) => setViewByMhh(e.target.value)}
                ></textarea>
                <div className="error-message">{errors.viewByMhh}</div>
              </td>
            </tr>
            <tr>
              <td>
              Advice by Doctor
              </td>
              <td>
                <textarea
                  name="adviceByMhh"
                  className="form-input"
                  cols="80"
                  rows="3"
                  value={adviceByMhh}
                  onChange={(e) => setAdviceByMhh(e.target.value)}
                ></textarea>
                <div className="error-message">{errors.adviceByMhh}</div>
              </td>
            </tr>
            <tr>
              <td>
                Propose Help by M.M.H <span className="error-message">⁕</span>
              </td>
              <td>
                <textarea
                  name="proposeHelpByMhh"
                  className="form-input"
                  cols="80"
                  rows="3"
                  value={proposeHelpByMhh}
                  onChange={(e) => setProposeHelpByMhh(e.target.value)}
                ></textarea>
                <div className="error-message">{errors.proposeHelpByMhh}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit"  className="btn-register-status submit">Submit</button>
      </div>
    </form>
  );
};

export default ViewMMH;

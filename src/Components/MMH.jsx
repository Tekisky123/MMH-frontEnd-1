import React, { useState } from "react";
import axios from "axios";

const MMH = ({ item, isDownloading, pdfRef }) => {
  console.log("jfdhsfjgdsf", item);
  //   const [viewContent, setViewContent] = useState("");
  //   const [adviceContent, setAdviceContent] = useState("");
  //   const [proposeHelpContent, setProposeHelpContent] = useState("");

  // Function to send data to the API using Axios
  //   const handleSubmit = async () => {
  //     try {
  //       const data = {
  //         viewContent,
  //         adviceContent,
  //         proposeHelpContent,
  //       };

  //       // Assuming you have an API endpoint, replace 'yourApiEndpoint' with the actual endpoint
  //       const response = await axios.get("https://mmh-jajh.onrender.com/patient/getpatient/", data);

  //       // Handle the response from the API if needed
  //       console.log("API Response:", response.data);
  //     } catch (error) {
  //       console.error("Error sending data to API:", error);
  //     }
  //   };

  return (
    <div>
      <h2 className="table-heading">Scheme/Hospital/MMH Guidance Plan</h2>
      <table>
        <tbody>
        <tr>
            <td>Scheme</td>
            <td>{item.schemeName}</td>
          </tr>
          <tr>
            <td>Hospital </td>
            <td>{item.hospital} </td>
          </tr>
          <tr>
            <td>View of M.M.H.</td>
            <td>{item.viewByMhh}</td>
          </tr>
          <tr>
            <td>Advice by Doctor</td>
            <td>{item.adviceByMhh}</td>
          </tr>
          <tr>
            <td>Propose Help by M.M.H</td>
            <td>{item.proposeHelpByMhh}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      {isDownloading && (
      <div className="end-div" ref={pdfRef}>
        <div className="sign-maincontainer">
          <div className="sign-container">
            <h6 className="sign-heading">Sig. of M.O.(M.M.H.)</h6>
          </div>
          <div className="sign-container">
            <h6 className="sign-heading">Verified by</h6>
          </div>
          <div className="sign-container">
            <h6 className="sign-heading">Sig. of Medico Social Worker</h6>
          </div>
        </div>
        <div className="instructions-container">
          <h5>Instructions:</h5>
          <ol style={{ lineHeight: "180%" }}>
            <li>
              {" "}
              Muslim Medical Help (MMH) is free of charge platform providing
              help and guidance to the patient on the request of applicant.
            </li>
            <li>
              Any service or help/offer/referral/suggestions/advice etc given by
              MMH is purely a help, either to accept or reject is at sole
              discretion of applicant/patient. If in case of any loss or damage
              or injury MMH shall not be held responsible
            </li>
            <li>
              MMH is just a platform that eases the patient to get information
              and help in regard with various Government Trust Private Hospitals
              and other information in respect of disease and offer help with
              information in connected with various hospitals, schemes.
            </li>
          </ol>
          <div className="sign-maincontainer">
            <div className="sign-container patient-sign">
              <h6 className="sign-heading">Signature of Patient</h6>
            </div>
            <div className="sign-container patient-sign">
              <h6 className="sign-heading">Signature of Care Taker</h6>
            </div>
            <div className="sign-container patient-sign">
              <h6 className="sign-heading">Signature of M.M.H.</h6>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default MMH;

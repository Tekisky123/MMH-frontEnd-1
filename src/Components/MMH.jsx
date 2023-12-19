import React, { useState } from "react";
import axios from "axios";

const MMH = ({item}) => {
    console.log("jfdhsfjgdsf",item);
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
//       const response = await axios.get("http://13.126.14.109:4000/patient/getpatient/", data);

//       // Handle the response from the API if needed
//       console.log("API Response:", response.data);
//     } catch (error) {
//       console.error("Error sending data to API:", error);
//     }
//   };


  return (
    <div>
      <h2 className="table-heading">Scheme/Hospital Details</h2>
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
        </tbody>
      </table>
      <h2 className="table-heading">MMH Guidance Plan</h2>
      <table>
       
        <tbody>
          <tr>
            <td>View of M.M.H.</td>
            <td>
              {item.viewByMhh}
            </td>
          </tr>
          <tr>
            <td>Advice by M.M.H.</td>
            <td>
              {item.adviceByMhh}
            </td>
          </tr>
          <tr>
            <td>Propose Help by M.M.H</td>
            <td>
                {item.proposeHelpByMhh}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MMH;

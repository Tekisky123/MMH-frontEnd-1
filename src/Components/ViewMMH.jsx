import React, { useState } from "react";
import axios from "axios";

const ViewMMH = ({currentItem}) => {
  const [schemeName, setSchemeName] = useState("");
  const [hospital, setHospital] = useState("");
  const [viewByMhh, setViewByMhh] = useState("");
  const [adviceByMhh, setAdviceByMhh] = useState("");
  const [proposeHelpByMhh, setProposeHelpByMhh] = useState("");

  // Function to send data to the API using Axios
  const handleSubmit = async (e) => {
    // e.preventDefault(); // Prevent default form submission

    try {
      const data = {
        schemeName,
        hospital,
        viewByMhh,
        adviceByMhh,
        proposeHelpByMhh,
        status: "Scheme & Hospital Selected",
      };

      // Assuming you have an API endpoint, replace 'yourApiEndpoint' with the actual endpoint
      const response = await axios.put("http://13.126.14.109:4000/patient/"+currentItem, data);

      // Handle the response from the API if needed
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="table-heading">Scheme/Hospital Details</h2>
        <table>
          
          <tbody>
            <tr>
              <td>Scheme</td>
              <td>
                <input
                  type="text"
                  value={schemeName}
                  onChange={(e) => setSchemeName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Hospital </td>
              <td>
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      <h2 className="table-heading">MMH Guidance Plan</h2>
      <table>
       
        <tbody>
        <tr>
              <td>View of M.M.H.</td>
              <td>
                <textarea
                  name="viewByMhh"
                  cols="80"
                  rows="3"
                  value={viewByMhh}
                  onChange={(e) => setViewByMhh(e.target.value)}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>Advice by M.M.H.</td>
              <td>
                <textarea
                  name="adviceByMhh"
                  cols="80"
                  rows="3"
                  value={adviceByMhh}
                  onChange={(e) => setAdviceByMhh(e.target.value)}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>Propose Help by M.M.H</td>
              <td>
                <textarea
                  name="proposeHelpByMhh"
                  cols="80"
                  rows="3"
                  value={proposeHelpByMhh}
                  onChange={(e) => setProposeHelpByMhh(e.target.value)}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ViewMMH;
import React, { useState } from "react";

const ViewMMH = () => {
  const [viewContent, setViewContent] = useState("");
  const [adviceContent, setAdviceContent] = useState("");
  const [proposeHelpContent, setProposeHelpContent] = useState("");
  const [freezeTextareas, setFreezeTextareas] = useState(false);

  const handleFreezeTextareas = () => {
    // Call the API function here before freezing the textareas
    handleSubmit();

    // Freeze the textareas after sending data to the API
    setFreezeTextareas(true);
  };

  const handleUnfreezeTextareas = () => {
    setFreezeTextareas(false);
  };

  // Function to send data to the API
  const handleSubmit = () => {
    const data = {
      viewContent,
      adviceContent,
      proposeHelpContent,
    };

    // Assuming you have an API endpoint, replace 'yourApiEndpoint' with the actual endpoint
    fetch(
      "http://13.126.14.109:4000/patient/getpatient/657dd9c7eacb8d8ad81b80c6",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API if needed
        console.log("API Response:", data);
      })
      .catch((error) => {
        console.error("Error sending data to API:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <h2 className="table-heading">Scheme/Hospital Details</h2>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Scheme</td>
            <td></td>
          </tr>
          <tr>
            <td>Hospital </td>
            <td>Sample Hospital </td>
          </tr>
        </tbody>
      </table>
      <h2 className="table-heading">MMH Guidance Plan</h2>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>View of M.M.H.</td>
            <td>
              <textarea
                name=""
                id=""
                cols="80"
                rows="3"
                value={viewContent}
                onChange={(e) => setViewContent(e.target.value)}
                readOnly={freezeTextareas}
                style={{
                  backgroundColor: freezeTextareas ? "#f0f0f0" : "white",
                }}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Advice by M.M.H.</td>
            <td>
              <textarea
                name=""
                id=""
                cols="80"
                rows="3"
                value={adviceContent}
                onChange={(e) => setAdviceContent(e.target.value)}
                readOnly={freezeTextareas}
                style={{
                  backgroundColor: freezeTextareas ? "#f0f0f0" : "white",
                }}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Propose Help by M.M.H</td>
            <td>
              <textarea
                name=""
                id=""
                cols="80"
                rows="3"
                value={proposeHelpContent}
                onChange={(e) => setProposeHelpContent(e.target.value)}
                readOnly={freezeTextareas}
                style={{
                  backgroundColor: freezeTextareas ? "#f0f0f0" : "white",
                }}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleFreezeTextareas}>Submit</button>
      <button onClick={handleUnfreezeTextareas}>Edit</button>
    </div>
    </form>
  );
};

export default ViewMMH;

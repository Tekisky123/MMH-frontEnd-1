import React, { useState } from "react";

const UploadDocument = () => {
  const [document, setDocument] = useState([]);
   

  const handleDocumentChange = (index, event) => {
    const { name, value } = event.target;
    const newDocument = [...document];
    newDocument[index][name] = value;
    setDocument(newDocument);
  };

  const handleAddDocument = () => {
    setDocument([...document, { document: "" }]);
  };

  const handleDeleteDocument = (index) => {
    const newDocument = [...document];
    newDocument.splice(index, 1);
    setDocument(newDocument);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the document data as needed
    console.log(document);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {document.map((doc, index) => (
          <div key={index}>
            <select name="" id="">
              <option value="">select document</option>
              <option value="">aadhar</option>
              <option value="">PAN</option>
            </select>
            <input type="file" name="document" value={doc.document} onChange={(e)=>handleDocumentChange(index, e)}/>
            <button type="button" onClick={() => handleDeleteDocument(index)}>
              Delete
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddDocument}>
          Add Document
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadDocument;

// Loader.js

import React, { useState, useEffect } from 'react';
import "../common/Loader.css"

const Loader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for demonstration purposes
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading && (
        <div className="loader">
          <div className="justify-content-center jimu-primary-loading"></div><br /><br /><br /><br />
          <h1>loading...</h1>
        </div>
      )}
      {!loading && children}
    </>
  );
};

export default Loader;

// Import necessary dependencies
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../Assets/Styles/AdminForms.css";
import { MdPerson, MdEmail, MdLockOutline, MdPhone, MdBadge, MdCheckCircle } from "react-icons/md";
import BaseURL from "../../common/Api";

// Functional component for creating a user
const CreateUser = () => {
  // Initialize necessary hooks and state variables
  const navigate = useNavigate();
  const { _id } = useParams();
  console.log(_id);

  // State variables for form data, errors, and success animation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    userType: "Please Select Role",
  });

  const [errors, setErrors] = useState({});
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Function to handle input changes and update form data
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Apply validation only if the input is for the mobile field
    if (name === "mobile") {
      // Remove non-digit characters and limit the input to 10 digits
      const truncatedValue = value.replace(/\D/g, '').slice(0, 10);

      setFormData((prevData) => ({ ...prevData, [name]: truncatedValue }));

      // Validate mobile number
      const isValidMobile = /^\d{10}$/.test(truncatedValue);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: isValidMobile ? "" : "Enter a valid 10-digit mobile number" }));
    } else {
      // For other fields, simply update the form data
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // Function to validate form inputs
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    // Validate mobile number with a regular expression
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
      isValid = false;
    }

    // Validate userType (dropdown)
    if (formData.userType === "Please Select Role") {
      newErrors.userType = "Please select a role";
      isValid = false;
    }

    // Set errors and return validation result
    setErrors(newErrors);
    return isValid;
  };

  // Function to handle form submission
  const onsubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (validateForm()) {
      // Make API call to register a new user
      axios
        .post(`${BaseURL}/user/register`, formData)
        .then((response) => {
          // Handle success response
          if (response.status === 200) {
            console.log(response.data);
            setShowSuccessAnimation(true);

            // Redirect to the user page after a delay
            setTimeout(() => {
              setShowSuccessAnimation(false);
              navigate("/user");
              // Optionally, reset form state here if needed
            }, 800);
          }
        });
    }
  };

  // JSX rendering for the CreateUser component
  return (
    <div className="npt-root">
      <div className="npt-wrapper">
        <div className="npt-card">
          <div className="npt-card-header">
            <h2 className="npt-card-title">Create User</h2>
            <p className="npt-card-subtitle">Register a new operator or admin.</p>
          </div>

          <form onSubmit={onsubmit} className="npt-form-body">
            <div className="npt-grid-2">
              {/* First Name */}
              <div className="npt-field">
                <label className="npt-label">First Name {errors.firstName && <span className="npt-req">*</span>}</label>
                <div className="npt-input-wrap">
                  <MdPerson className="npt-input-icon" />
                  <input
                    type="text"
                    className="npt-input npt-input--has-icon"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.firstName && <span className="npt-error">{errors.firstName}</span>}
              </div>

              {/* Last Name */}
              <div className="npt-field">
                <label className="npt-label">Last Name {errors.lastName && <span className="npt-req">*</span>}</label>
                <div className="npt-input-wrap">
                  <MdPerson className="npt-input-icon" />
                  <input
                    type="text"
                    className="npt-input npt-input--has-icon"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.lastName && <span className="npt-error">{errors.lastName}</span>}
              </div>

              {/* Email */}
              <div className="npt-field">
                <label className="npt-label">Email Address {errors.email && <span className="npt-req">*</span>}</label>
                <div className="npt-input-wrap">
                  <MdEmail className="npt-input-icon" />
                  <input
                    type="email"
                    className="npt-input npt-input--has-icon"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.email && <span className="npt-error">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className="npt-field">
                <label className="npt-label">Password {errors.password && <span className="npt-req">*</span>}</label>
                <div className="npt-input-wrap">
                  <MdLockOutline className="npt-input-icon" />
                  <input
                    type="password"
                    className="npt-input npt-input--has-icon"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.password && <span className="npt-error">{errors.password}</span>}
              </div>

              {/* Mobile Number */}
              <div className="npt-field">
                <label className="npt-label">Mobile Number {errors.mobile && <span className="npt-req">*</span>}</label>
                <div className="npt-input-wrap">
                  <MdPhone className="npt-input-icon" />
                  <input
                    type="number"
                    className="npt-input npt-input--has-icon"
                    name="mobile"
                    placeholder="Enter 10-digit mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    required
                  />
                </div>
                {errors.mobile && <span className="npt-error">{errors.mobile}</span>}
              </div>

              {/* User Type */}
              <div className="npt-field">
                <label className="npt-label">User Type {errors.userType && <span className="npt-req">*</span>}</label>
                <div className="npt-input-wrap">
                  <MdBadge className="npt-input-icon" />
                  <select
                    className="npt-input npt-select npt-input--has-icon"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                  >
                    <option value="Please Select Role">Please Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="SuperAdmin">Super Admin</option>
                    <option value="Operator">Operator</option>
                  </select>
                </div>
                {errors.userType && <span className="npt-error">{errors.userType}</span>}
              </div>
            </div>

            <div className="npt-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button className="npt-btn npt-btn--primary" type="submit">
                + Create User
              </button>
            </div>
          </form>
        </div>

        {/* Success Modal Overlay */}
        {showSuccessAnimation && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999
          }}>
            <div style={{
              background: "#fff", padding: "40px", borderRadius: "16px", textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}>
              <MdCheckCircle style={{ fontSize: "4rem", color: "#16a34a" }} />
              <h3 style={{ fontSize: "1.5rem", color: "#1e293b", margin: 0 }}>User Created!</h3>
              <p style={{ color: "#64748b", margin: 0 }}>Redirecting to user directory...</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CreateUser; // Export the CreateUser component as the default export

// Import necessary dependencies
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../Assets/Styles/Signup.css";

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
        .post("https://mmh-jajh.onrender.com/user/register", formData)
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
            }, 2000);
          }
        });
    }
  };

  // JSX rendering for the CreateUser component
  return (
    <div className="Main-container">
      <section className="section">
        <div className="form-box-user">
          <div className="form-value">
            <form onSubmit={onsubmit}>
              <h2 className="heading">Create User</h2>
              {/* Input fields for user details */}

              <div className="names">
                <div className="inputbox name">
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <label>
                    First Name{" "}
                    <span className="error-message">
                      {errors.firstName ? "⁕" : ""}
                    </span>
                  </label>
                  {errors.firstName && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div className="inputbox name">
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <label>
                    Last Name{" "}
                    <span className="error-message">
                      {errors.lastName ? "⁕" : ""}
                    </span>
                  </label>
                  {errors.lastName && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              <div className="inputbox second-section">
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label>
                  Email{" "}
                  <span className="error-message">
                    {errors.email ? "⁕" : ""}
                  </span>
                </label>
                {errors.email && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="inputbox second-section">
                <input
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label>
                  Password{" "}
                  <span className="error-message">
                    {errors.password ? "⁕" : ""}
                  </span>
                </label>
                {errors.password && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="inputbox second-section">
                <input
                  type="number"
                  required
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength="10"
                />
                <label>
                  Mobile Number{" "}
                  <span className="error-message">
                    {errors.mobile ? "⁕" : ""}
                  </span>
                </label>
                {errors.mobile && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.mobile}
                  </span>
                )}
              </div>

              <div className="role-type">
                <label htmlFor="">
                  User Type{" "}
                  <span className="error-message">
                    {errors.userType ? "⁕" : ""}
                  </span>
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option>Please Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">Super Admin</option>
                  <option value="Operator">Operator</option>
                </select>
                {errors.userType && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.userType}
                  </span>
                )}
              </div>

              <button className="create btn-login" type="submit">
                Create User
              </button>
              {/* Success Animation */}
            </form>
          </div>
        </div>
        {/* Blur background during success animation */}

        <div className={` ${showSuccessAnimation ? "blur-background" : ""}`}>
          {showSuccessAnimation && (
            <div className="success-animation">
              {/* Checkmark SVG for success animation */}
              <svg
                className="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
          )}
          {/* Your existing content goes here */}
        </div>
      </section>
    </div>
  );
};

export default CreateUser; // Export the CreateUser component as the default export

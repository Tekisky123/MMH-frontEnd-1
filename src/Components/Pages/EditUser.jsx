import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../Assets/Styles/AdminForms.css";
import { MdPerson, MdEmail, MdLockOutline, MdPhone, MdBadge, MdCheckCircle } from "react-icons/md";
import BaseURL from "../../common/Api";

const EditData = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const baseURL = `${BaseURL}/user/updateuser`;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    userType: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const { firstName, lastName, email, password, mobile, userType } = data;

  useEffect(() => {
    getData();
  }, [_id]); // Add _id as a dependency

  const getData = async () => {
    try {
      const result = await axios.get(`${BaseURL}/user/${_id}`);
      console.log(result);

      const { firstName, lastName, email, password, mobile, userType } =
        result.data;

      setData({ firstName, lastName, email, password, mobile, userType });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Apply validation only if the input is for the mobile field
    if (name === "mobile") {
      // Remove non-digit characters and limit the input to 10 digits
      const truncatedValue = value.replace(/\D/g, '').slice(0, 10);

      setData((prevData) => ({ ...prevData, [name]: truncatedValue }));

      // Validate mobile number
      const isValidMobile = /^\d{10}$/.test(truncatedValue);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: isValidMobile ? "" : "Enter a valid 10-digit mobile number" }));
    } else {
      // For other fields, simply update the form data
      setData((prevData) => ({ ...prevData, [name]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };
  const validationRegex = {
    name: /^[a-zA-Z\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    mobile: /^[0-9]{10}$/,
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate First Name
    if (!validationRegex.name.test(firstName)) {
      newErrors.firstName = "Invalid first name";
      isValid = false;
    }

    // Validate Last Name
    if (!validationRegex.name.test(lastName)) {
      newErrors.lastName = "Invalid last name";
      isValid = false;
    }

    // Validate Email
    if (!validationRegex.email.test(email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    // Validate Password
    // if (!validationRegex.password.test(password)) {
    //   newErrors.password =
    //     "Invalid password (minimum 8 characters)";
    //   isValid = false;
    // }

    // Validate Mobile Number
    if (!validationRegex.mobile.test(mobile)) {
      newErrors.mobile = "Invalid mobile number (should be 10 digits)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await axios.post(baseURL, {
          firstName,
          lastName,
          email,
          password,
          mobile,
          userType,
        });

        console.log(res);

        toast.success("Data Successfully Updated");
        setTimeout(() => {
          navigate("/user");
        }, 800);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="npt-root">
      <div className="npt-wrapper">
        <div className="npt-card">
          <div className="npt-card-header">
            <h2 className="npt-card-title">Edit User</h2>
            <p className="npt-card-subtitle">Update details for an existing operator or admin.</p>
          </div>

          <form onSubmit={handleSubmit} className="npt-form-body">
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
                    value={data.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.firstName && <span className="npt-error" style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</span>}
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
                    value={data.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.lastName && <span className="npt-error" style={{ color: 'red', fontSize: '12px' }}>{errors.lastName}</span>}
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
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.email && <span className="npt-error" style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
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
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.password && <span className="npt-error" style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
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
                    value={data.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    required
                  />
                </div>
                {errors.mobile && <span className="npt-error" style={{ color: 'red', fontSize: '12px' }}>{errors.mobile}</span>}
              </div>

              {/* User Type */}
              <div className="npt-field">
                <label className="npt-label">User Type {errors.userType && <span className="npt-req">*</span>}</label>
                <div className="npt-input-wrap">
                  <MdBadge className="npt-input-icon" />
                  <select
                    className="npt-input npt-select npt-input--has-icon"
                    name="userType"
                    value={data.userType}
                    onChange={handleChange}
                  >
                    <option value="Please Select Role">Please Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="SuperAdmin">Super Admin</option>
                    <option value="Operator">Operator</option>
                  </select>
                </div>
                {errors.userType && <span className="npt-error" style={{ color: 'red', fontSize: '12px' }}>{errors.userType}</span>}
              </div>
            </div>

            <div className="npt-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button className="npt-btn npt-btn--primary" type="submit">
                Update User
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
              <h3 style={{ fontSize: "1.5rem", color: "#1e293b", margin: 0 }}>User Updated!</h3>
              <p style={{ color: "#64748b", margin: 0 }}>Redirecting to user directory...</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EditData;

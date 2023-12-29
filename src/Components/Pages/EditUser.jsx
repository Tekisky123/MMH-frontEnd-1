import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../Assets/Styles/Signup.css";

const EditData = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const baseURL = `https://mmh-jajh.onrender.com/user/updateuser`;

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
      const result = await axios.get(`https://mmh-jajh.onrender.com/user/${_id}`);
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
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="Main-container ">
      <section className="section ">
        <div className="form-box-user edit ">
          <div className="form-value ">
            <form onSubmit={handleSubmit}>
              <h2 className="heading">Edit User</h2>
              {/* Input fields for user details */}

              <div className="names">
                <div className="inputbox name">
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={data.firstName}
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
                    value={data.lastName}
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
                  value={data.email}
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
                  value={data.password}
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
                  value={data.mobile}
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
                  value={data.userType}
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

              {/* ... (Previous code remains unchanged) */}

              <button className="create btn-login" type="submit">
                Update User
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

export default EditData;

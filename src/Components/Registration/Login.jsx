import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { MdPhone, MdLock } from "react-icons/md";
import "../../Assets/Styles/Login.css";
import logo from "../../Assets/Images/logo-main.png";
import BaseURL from "../../common/Api";

const Login = ({ setUserType }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const notifyError = (message) => {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: message || "Something went wrong. Please try again.",
      confirmButtonColor: "#a4c639",
      background: "#fff",
      customClass: {
        popup: "swal-custom-popup",
        title: "swal-custom-title",
        confirmButton: "swal-custom-btn",
      },
    });
  };

  const notifySuccess = (message) => {
    Swal.fire({
      icon: "success",
      title: "Welcome!",
      text: message,
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: "#a4c639",
      background: "#fff",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobileNumber)) {
      notifyError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BaseURL}/user/login`, {
        mobile: mobileNumber,
        password,
      });
      setLoading(false);

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("mobileNumber", mobileNumber);
        const type = response.data.data?.userType || "";
        setUserType(type);
        notifySuccess("Login successful! Redirecting...");

        // Navigation Logic
        setTimeout(() => {
          if (type === "Operator") {
            navigate("/home");
          } else {
            navigate("/dashboard");
          }
        }, 1600);
      }
    } catch (error) {
      setLoading(false);
      // Properly extract the API error message from the response body
      const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        "An unexpected error occurred. Please try again.";
      notifyError(typeof apiMessage === "string" ? apiMessage : "Login failed.");
    }
  };

  return (
    <div className="login-page">
      {/* Left decorative panel */}
      <div className="login-left-panel">
        <div className="login-brand">
          <img src={logo} alt="MMH Logo" className="login-logo" />
          <h1 className="login-brand-title">MMH Portal</h1>
          <p className="login-brand-subtitle">
            Empowering healthcare management with excellence
          </p>
        </div>
        <div className="login-decoration-circles">
          <div className="dec-circle dec-circle-1" />
          <div className="dec-circle dec-circle-2" />
          <div className="dec-circle dec-circle-3" />
        </div>
      </div>

      {/* Right form panel */}
      <div className="login-right-panel">
        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-title">Sign In</h2>
            <p className="login-subtitle">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="login-form" noValidate>
            {/* Mobile Number */}
            <div className="login-field">
              <label className="login-label">Mobile Number</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <MdPhone />
                </span>
                <input
                  type="tel"
                  className="login-input"
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  maxLength={10}
                  required
                  onChange={(e) =>
                    setMobileNumber(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label className="login-label">Password</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <MdLock />
                </span>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="login-input"
                  placeholder="Enter your password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                  tabIndex={-1}
                >
                  {isPasswordVisible ? <IoEyeSharp /> : <BsEyeSlashFill />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="login-spinner" />
              ) : (
                "Sign In"
              )}
            </button>

            <div className="login-contact">
              <p>
                Don't have an account?{" "}
                <span
                  className="login-contact-link"
                  onClick={() => setShowModal(true)}
                >
                  Contact Admin
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Admin Modal */}
      {showModal && (
        <>
          <div
            className="login-overlay"
            onClick={() => setShowModal(false)}
          />
          <div className="login-modal">
            <div className="login-modal-inner">
              <h3 className="login-modal-title">Contact Admin</h3>
              <div className="login-modal-row">
                <span className="login-modal-label">Name</span>
                <span className="login-modal-value">
                  Advocate Talha, Mohammad Siddiqui
                </span>
              </div>
              <div className="login-modal-row">
                <span className="login-modal-label">Phone</span>
                <span className="login-modal-value">
                  9923472806 &nbsp;|&nbsp; 9011304885
                </span>
              </div>
              <button
                className="login-modal-close"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;

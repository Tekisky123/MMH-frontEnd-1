import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";
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

  // SweetAlert2 for Error messages
  const notifyError = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  };

  // SweetAlert2 for Success messages
  const notifySuccess = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobileNumber)) {
      notifyError("Invalid mobile number format");
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
        setUserType(response.data.userType);
        notifySuccess("Login successful! Redirecting to dashboard...");
        navigate("/dashboard");
      } else {
        notifyError("Invalid login credentials");
      }
    } catch (error) {
      setLoading(false);
      notifyError("Error during login");
    }
  };

  return (
    <div className="main-container">
      <div className="left-section">
        <img src={logo} alt="Logo" />
      </div>
      <div className="right-section">
        <div className="login-form-container">
          <form onSubmit={handleLogin}>
            <h2 className="login-heading">Login</h2>
            <div className="input-group">
              <input
                type="text"
                required
                value={mobileNumber}
                placeholder="Mobile Number"
                maxLength={10}
                onChange={(e) =>
                  setMobileNumber(e.target.value.replace(/\D/g, ""))
                }
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit mobile number"
              />
            </div>
            <div className="input-group">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <IoEyeSharp /> : <BsEyeSlashFill />}
              </button>
            </div>
            <button type="submit" className="login-btn">
              {isLoading ? <Spinner size="sm" animation="border" /> : "Login"}
            </button>
            <div className="register-text">
              <p>
                Don't have an account?{" "}
                <Link onClick={() => setShowModal(true)}>Contact Admin</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <>
          <div
            className="login-modal-overlay"
            onClick={() => setShowModal(false)}
          />
          <div className="login-modal-container">
            <div className="login-modal-content">
              <h2>Contact Admin</h2>
              <p>
                Name: <span>Advocate Talha, Mohammad Siddiqui</span>
              </p>
              <p>
                Phone: <span>9923472806, 9011304885</span>
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="login-modal-close-btn"
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

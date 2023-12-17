// Import necessary dependencies
import { Link, useNavigate } from "react-router-dom";
import "../../Assets/Styles/Login.css"; // Import the CSS file for styling
import logo from "../../Assets/Images/logo-main.png"; // Import the logo image
import { useState } from "react"; // Import the useState hook for managing state
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications
import axios from "axios"; // Import Axios for API requests
// import { Modal } from "bootstrap";
import Modal from "react-modal";

// Functional component for the Login page
const Login = ({ setUserType }) => {
  const [showContactAdminModal, setShowContactAdminModal] = useState(false);
  const openContactAdminModal = () => {
    setShowContactAdminModal(true);
  };

  // Function to handle closing the contact admin modal
  const closeContactAdminModal = () => {
    setShowContactAdminModal(false);
  };
  // Initialize the navigation hook from React Router
  const navigate = useNavigate();

  // Functions to show toast notifications for login success and failure
  const notifyError = () => toast.error("Invalid Number or Password");
  const notifySuccess = () => toast.success("Successfully logged in");

  // State variables to store mobile number, password, and user type
  const [MobileNumber, setMobileNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [userType, setuserType] = useState("");

  // Function to handle form submission
  const SubmitData = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to the login endpoint with user credentials
      const response = await axios.post(
        "http://13.126.14.109:4000/user/login",
        {
          mobile: MobileNumber,
          password: Password,
          userType: userType,
        }
      );

      console.log(response.data.data.userType);

      if (response.status === 200) {
        // Save user type in local storage and update in the parent component
        localStorage.setItem("userType", response.data.data.userType);
        setUserType(response.data.data.userType);
        notifySuccess(); // Show success toast notification

        // Redirect to the dashboard after a delay
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        // Show error toast notification for invalid credentials
        notifyError();
        console.log("Error occurred");
        console.log(notifyError);
      }
    } catch (error) {
      // Handle API call errors (e.g., network issues, server errors)
      console.error("API call error:", error);
      notifyError();
    }
  };

  // JSX rendering for the Login component
  return (
    <div className="Main-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />{" "}
      {/* Container for displaying toast notifications */}
      <section className="section">
        <div className="logo">
          <img src={logo} className="logo" alt="" /> {/* Display the logo */}
        </div>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={SubmitData}>
              <h2 className="heading">Login</h2>
              {/* Input fields for mobile number and password */}
              <div className="input-box">
                <input
                  type="number"
                  required
                  value={MobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <label>Mobile Number</label>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password</label>
              </div>
              {/* Checkbox for "Remember Me" and link for "Forget Password" */}
              <div className="forget">
                <label>
                  <input type="checkbox" /> Remember Me{" "}
                  <Link to="#">Forget Password</Link>
                </label>
              </div>
              {/* Submit button for the login form */}
              <button type="submit" className="btn-login">
                Log in
              </button>
              {/* Link to the registration page */}
              <div className="register">
                <p>
                  Don't have an account{" "}
                  <Link onClick={openContactAdminModal}>Contact Admins</Link>
                </p>
                {/* Contact Admin Modal */}
                <Modal
                  isOpen={showContactAdminModal}
                  onRequestClose={closeContactAdminModal}
                  contentLabel="Contact Admin Modal"
                  ariaHideApp={false}
                  className="custom-modal" // Apply custom-modal class for styling
                  overlayClassName="custom-overlay" // Apply custom-overlay class for styling
                >
                  <div className="modal-content">
                    <h2>Contact Admins</h2>
                    <p>
                      Admin Name: <span> Admin Name</span>
                    </p>
                    <p>
                      Mobile Number: <span> Admin's Mobile Number</span>
                    </p>
                    <button  className="btn-login" onClick={closeContactAdminModal}> Close</button>
                  </div>
                </Modal>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login; // Export the Login component as the default export

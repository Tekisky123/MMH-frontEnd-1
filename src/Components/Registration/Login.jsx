// Import necessary dependencies from React and third-party libraries
import { Link, useNavigate } from "react-router-dom";
import "../../Assets/Styles/Login.css"; // Import the CSS file for styling
import logo from "../../Assets/Images/Logo.png"; // Import the logo image
import { useState } from "react"; // Import the useState hook for managing state
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications
import axios from "axios"; // Import Axios for API requests

// Functional component for the Login page
const Login = () => {
  // Initialize the navigation hook from React Router
  const navigate = useNavigate();

  // Functions to show toast notifications for login success and failure
  const notifyError = () => toast.error("Invalid Number or Password");
  const notifySuccess = () => toast.success("Successfully logged in");

  // State variables to store mobile number and password
  const [MobileNumber, setMobileNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [userType, setuserType] = useState("");

  // Function to handle form submission
  const SubmitData = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to your login endpoint with user credentials
      const response = await axios.post(
        " http://13.126.14.109:4000/user/login",
        {
          mobile: MobileNumber,
          password: Password,
          userType: userType,
        }
      );

      // Assuming your API returns a success status
      if (response.status === 200) {
        console.log("success");
        if (userType === "Operator") {
          window.location.href = "/operatorheader";
        } else {
          window.location.href = "/home";
        }
        notifySuccess(); // Show success toast notification
        // Redirect to the dashboard after a delay
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        // Show error toast notification for invalid credentials
        notifyError();
        console.log("error hai bhai");
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
                  Don't have an account <Link to={"/Signup"}>Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login; // Export the Login component as the default export

// Import necessary dependencies from React and third-party libraries
import { Link, useNavigate } from "react-router-dom";
import "../../Assets/Styles/RegistrationStyles/Login.css"; // Import the CSS file for styling
import logo from "../../Assets/Images/Logo.png"; // Import the logo image
import { useState } from "react"; // Import the useState hook for managing state
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications

// Functional component for the Login page
const Login = () => {
  // Initialize the navigation hook from React Router
  const navigate = useNavigate();

  // Functions to show toast notifications for login success and failure
  const notifyError = () => toast.error("Invalid Number or Password");
  const notifySuccess = () => toast.success("Successfully login");

  // State variables to store mobile number and password
  const [MobileNumber, setMobileNumber] = useState();
  const [Password, setPassword] = useState();

  // Retrieve stored mobile number and password from local storage
  const MobileNumberData = localStorage.getItem("mobile-number");
  const PasswordData = localStorage.getItem("password");

  // Function to handle form submission
  const SubmitData = (e) => {
    e.preventDefault();

    // Check if entered mobile number and password match stored values
    if (MobileNumber === MobileNumberData || Password === PasswordData) {
      console.log("success");
      notifySuccess(); // Show success toast notification
      // Redirect to the dashboard after a delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      // Show error toast notification for invalid credentials
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
         /> {/* Container for displaying toast notifications */}
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
                  <Link href="#">Forget Password</Link>
                </label>
              </div>
              {/* Submit button for the login form */}
              <button type="submit" className="btn-login">Log in</button>
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
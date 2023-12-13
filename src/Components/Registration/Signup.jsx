// Import necessary dependencies from React and third-party libraries
import { Link } from "react-router-dom";
import "../../Assets/Styles/Signup.css"; // Import the CSS file for styling
import { useState } from "react"; // Import the useState hook for managing state

// Functional component for the Signup page
const Signup = () => {
  // States for registration form fields
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [Roles, setRoles] = useState("");

  // Form submit function
  const FormSubmit = (e) => {
    e.preventDefault();

    // Store user registration data in local storage
    localStorage.setItem("first-name", FirstName);
    localStorage.setItem("last-name", LastName);
    localStorage.setItem("mobile-number", MobileNumber);
    localStorage.setItem("password", Password);
    localStorage.setItem("Roles", Roles);
  };

  // JSX rendering for the Signup component
  return (
    <div className="Main-container">
      <section className="section">
        <div className="form-box-main">
          <div className="form-value">
            <form action="" onSubmit={FormSubmit}>
              <h2 className="heading">Create Account</h2>
              {/* Input fields for first name and last name */}
              <div className="names">
                <div className="inputbox name">
                  <input
                    type="text"
                    required
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label>FirstName</label>
                </div>
                <div className="inputbox name">
                  <input
                    type="text"
                    required
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label>LastName</label>
                </div>
              </div>
              {/* Input fields for mobile number and password */}
              <div className="inputbox second-section">
                <input
                  type="number"
                  required
                  value={MobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <label>Mobile Number</label>
              </div>
              <div className="inputbox second-section">
                <input
                  type="password"
                  required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Set Password</label>
              </div>
              {/* Dropdown for selecting user role */}
              <div className="role-type">
                <select
                  value={Roles}
                  onChange={(e) => setRoles(e.target.value)}
                  className="role-type"
                >
                  <option>Please Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Operator">Operator</option>

                </select>
              </div>
              {/* Checkbox for "Remember Me" and link for "Forget Password" */}
              <div className="forget">
                <label>
                  <input type="checkbox" /> Remember Me{" "}
                  <Link>Forget Password</Link>
                </label>
              </div>
              {/* Button to submit the registration form */}
              <button className="create btn-login" type="submit">Create Account</button>
              {/* Link to the login page for users with existing accounts */}
              <div className="register">
                <p>
                  
                  <Link to={"/"}>Already have an account </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup; // Export the Signup component as the default export
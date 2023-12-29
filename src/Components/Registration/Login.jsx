// Import necessary dependencies
import { Link, useNavigate } from "react-router-dom";
import "../../Assets/Styles/Login.css";
import logo from "../../Assets/Images/logo-main.png";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import Modal from "react-modal";
import { useAuth } from "../Auth";
import Spinner from "react-bootstrap/Spinner";

// Placeholder for LoaderComponent (adjust as needed)

// Functional component for the Login page
const Login = ({ setUserType }) => {
  const auth = useAuth();
  const [showContactAdminModal, setShowContactAdminModal] = useState(false);
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(0);
  const [isloading, setLoading] = useState(false); // New state for loader
  const [isPassShow, setIsPassShow] = useState(false);
  const openContactAdminModal = () => {
    setShowContactAdminModal(true);
  };

  // Function to handle closing the contact admin modal
  const closeContactAdminModal = () => {
    setShowContactAdminModal(false);
  };

  const navigate = useNavigate();

  const notifyError = () => toast("Invalid Number or Password");

  const [MobileNumber, setMobileNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [userType, setuserType] = useState("");

  const mobileNumberRegex = /^[0-9]{10}$/;

  useEffect(() => {
    let login = localStorage.getItem("login");
    navigate("/");
    if (!login) {
      navigate("/");
    }
  }, [navigate]);

  const SubmitData = async (e) => {
    e.preventDefault();

    if (!mobileNumberRegex.test(MobileNumber)) {
      toast.error("Invalid mobile number format");
      return;
    }

    try {
      setLoading(true); // Show loader while making API call

      const response = await axios.post(
        "https://mmh-jajh.onrender.com/user/login",
        {
          mobile: MobileNumber,
          password: Password,
          userType: userType,
        }
      );

      setLoading(false); // Hide loader after API call

      if (response.status === 200) {
        localStorage.setItem("userType", response.data.data.userType);
        localStorage.setItem("mobileNumber", response.data.data.mobile);
        localStorage.setItem("accessToken", response?.data?.token);
        localStorage.setItem("login", true);
        setUserType(response.data.data.userType);

        toast.success("Login successful!");
        setTimeout(() => {
          response.data.data.userType === "Operator"
            ? navigate("/dashboard/:number")
            : navigate("/home");
        }, 1000);
      } else {
        setFailedLoginAttempts((prevAttempts) => prevAttempts + 1);
        notifyError();
        console.log("Error occurred");
        console.log(notifyError);
        console.log("fault here");
      }
    } catch (error) {
      console.error("API call error:", error.message);
      notifyError();
    }
  };

  return (
    <div className="Main-container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <section className="section">
        <div className="logo">
          <img src={logo} className="logo" alt="" />
        </div>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={SubmitData}>
              <h2 className="heading">Login</h2>
              <div className="input-box">
                <input
                  type="text"
                  pattern="[0-9]{10}"
                  required
                  value={MobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  maxLength={10}
                  title="Mobile number must be 10 digits"
                />
                <label>Mobile Number</label>
              </div>

              <div className="input-box">
                
                <input
                  type={isPassShow ? "text" : "password"}
                  required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password</label>
               
              </div>
              <button className="show-hide"
                  type="button"
                  onClick={() => setIsPassShow(!isPassShow)}
                >
                  {isPassShow ? <IoEyeSharp /> : <BsEyeSlashFill />}
                </button>

              <button type="submit" className="btn-login">
                {isloading && (
                  <Spinner
                    className="me-2"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                Log in
              </button>
              {/* Loader component */}
              <div className="register">
                <p>
                  Don't have an account{" "}
                  <Link onClick={openContactAdminModal}>Contact Admins</Link>
                </p>
                <Modal
                  isOpen={showContactAdminModal}
                  onRequestClose={closeContactAdminModal}
                  contentLabel="Contact Admin Modal"
                  ariaHideApp={false}
                  className="custom-modal"
                  overlayClassName="custom-overlay"
                >
                  <div className="modal-content">
                    <h2>Contact Admins</h2>
                    <p>
                      Admin Name:{" "}
                      <span>
                        {" "}
                        Advocate Talha ,<br /> Mohammad Siddiqui
                      </span>
                    </p>
                    <p>
                      Mobile Number: <span>9923472806, 9011304885</span>
                    </p>
                    <button
                      className="btn-login"
                      onClick={closeContactAdminModal}
                    >
                      {" "}
                      Close
                    </button>
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

export default Login;

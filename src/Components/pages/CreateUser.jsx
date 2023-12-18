import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../Assets/Styles/Signup.css";
import { useForm } from "react-hook-form";

const CreateUser = () => {
  const navigate = useNavigate();
  const editid =useParams()
  const { register, handleSubmit, reset } = useForm();

  const { _id } = useParams();
  console.log(_id);

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
  // useEffect(() => {
  //   getEditUserDetails()
  // }, [])
  

  const getEditUserDetails=(editid)=>{
    axios.get("http://13.126.14.109:4000/user/getuser/"+editid).then((response) => {
      console.log(response.data);
    })
  }

  const onsubmit = (data) => {
    console.log(data );
    console.log("simple ");
    // if(editid){
    //   axios.put(`http://13.126.14.109:4000/user/updateuser/${editid}`, data).then((response) => {
    //   console.log(response.data);
    // })
    // }else{
    //   axios.post("http://13.126.14.109:4000/user/register", data).then((response) => {
    //   console.log(response.data);
    // })
    // }

      axios.post("http://13.126.14.109:4000/user/register", data).then((response) => {
      console.log(response.data);
    })

    navigate("/user")
    reset();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

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

    // Validate mobile
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    }

    // Validate userType (dropdown)
    if (formData.userType === "Please Select Role") {
      newErrors.userType = "Please select a role";
      isValid = false;
    }

    // Add more specific validation if needed

    setErrors(newErrors);
    return isValid;
  };

  const onsubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post("http://13.126.14.109:4000/user/register", formData)
        .then((response) => {
          console.log(response.data);
          setShowSuccessAnimation(true);

          setTimeout(() => {
            setShowSuccessAnimation(false);
            navigate("/user");
            // Optionally, reset form state here if needed
          }, 2000);
        });
    }
  };

  return (
    <div className="Main-container">
      <section className="section">
        <div className="form-box-user">
          <div className="form-value">
            <form onSubmit={onsubmit}>
              <h2 className="heading">Create User</h2>
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
                    First Name <span className="error-message">⁕</span>
                  </label>
                  {errors.firstName && (
                    <span className="error">{errors.firstName}</span>
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
                    Last Name <span className="error-message">⁕</span>
                  </label>
                  {errors.lastName && (
                    <span className="error">{errors.lastName}</span>
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
                  Email <span className="error-message">⁕</span>
                </label>
                {errors.email && <span className="error">{errors.email}</span>}
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
                  Password <span className="error-message">⁕</span>
                </label>
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <div className="inputbox second-section">
                <input
                  type="number"
                  required
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                <label>
                  Mobile Number <span className="error-message">⁕</span>
                </label>
                {errors.mobile && (
                  <span className="error">{errors.mobile}</span>
                )}
              </div>
              <div className="role-type">
                <label htmlFor="">
                  User Type <span className="error-message">⁕</span>
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
              </div>
              <button className="create btn-login" type="submit">
                Create User
              </button>
              {/* Success Animation */}
             
            </form>
          </div>
        </div>
        <div
                className={` ${
                  showSuccessAnimation ? "blur-background" : ""
                }`}
              >
                {showSuccessAnimation && (
                  <div className="success-animation">
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
};}

export default CreateUser;

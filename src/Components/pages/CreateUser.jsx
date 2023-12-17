// Import necessary dependencies from React and third-party libraries
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import "../../Assets/Styles/Signup.css"; // Import the CSS file for styling
import { useEffect, useState } from "react"; // Import the useState hook for managing state
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

// Functional component for the Signup page
const CreateUser = () => {
  const navigate = useNavigate();
  const editid =useParams()
  const { register, handleSubmit, reset } = useForm();

  const { _id } = useParams();
  console.log(_id);

  // const baseURL = "http://13.126.14.109:4000/user/getuser";

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

  };

  // JSX rendering for the Signup component
  return (
    <div className="Main-container">
      <section className="section">
        <div className="form-box-user">
          <div className="form-value">
            <form action="" onSubmit={handleSubmit(onsubmit)}>
              <h2 className="heading">Create User</h2>
              {/* Input fields for first name and last name */}
              <div className="names">
                <div className="inputbox name">
                  <input
                    type="text"
                    required
                    {...register("firstName", { required: true })}
                  />
                  <label>First Name</label>
                </div>
                <div className="inputbox name">
                  <input
                    type="text"
                    required
                    {...register("lastName", { required: true })}
                  />
                  <label>Last Name</label>
                </div>
              </div>
              {/* Input fields for email, password, and mobile */}
              <div className="inputbox second-section">
                <input
                  type="email"
                  required
                  {...register("email", { required: true })}
                />
                <label>Email</label>
              </div>
              <div className="inputbox second-section">
                <input
                  type="password"
                  required
                  {...register("password", { required: true })}
                />
                <label>Password</label>
              </div>
              <div className="inputbox second-section">
                <input
                  type="number"
                  required
                  {...register("mobile", { required: true })}
                />
                <label>Mobile Number</label>
              </div>
              {/* Dropdown for selecting user role */}
              <div className="role-type">
                <select
                  {...register("userType", { required: true })}
                  className="role-type"
                >
                  <option>Please Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">Super Admin</option>
                  <option value="Operator">Operator</option>
                </select>
              </div>
              {/* Button to submit the registration form */}
              <button
                className="create btn-login"
                type="submit"
                // onClick={() => navigate("/user")}
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateUser; // Export the Signup component as the default export

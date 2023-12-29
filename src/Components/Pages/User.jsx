import React, { useEffect, useState } from "react";
import "../../Assets/Styles/User.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// User component to display and manage user data
const User = ({ location }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  

  // Fetch user data on component mount and whenever data changes
  useEffect(() => {
    getData();
  }, []);

  // Delete user data by ID
  const DeleteData = async (id) => {
    await axios.get(`https://mmh-jajh.onrender.com/user/deleteuser/${id}`);
    getData();
  };

  // Fetch user data from the API
  const getData = async () => {
    try {
      setLoader(true);
      const result = await axios.get("https://mmh-jajh.onrender.com/user/getuser");

      setData(result.data.data); // Use result.data.data to access the array of users
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  // React Router hook for navigation
  const navigate = useNavigate();

  return (
    <div className="user-table-container">
      {/* Button to navigate to the Create User page */}
      <button
        className="add-user-button"
        onClick={() => navigate("/createuser")}
      >
        Add User
      </button>
      {/* Table to display user data */}
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>User Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.userType}</td>
              <td>
                {/* Button for editing user data */}
                <button
                    className="edit-button"
                    // to={`/edituser/${user._id}`}
                    // onClick={`/edituser/${user._id}`}
                    onClick={() => navigate(`/edituser/${user._id}`)}

                  >
                    Edit
                  </button>
                <button
                  className="delete-button"
                  onClick={() => DeleteData(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;

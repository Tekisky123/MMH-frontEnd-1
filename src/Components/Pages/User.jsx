import React, { useEffect, useState } from "react";
import "../../Assets/Styles/User.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, [data]);

  const DeleteData = async (id) => {
    await axios.get(`http://13.126.14.109:4000/user/deleteuser/${id}`);
    getData();
  };

  const getData = async () => {
    try {
      setLoader(true);
      const result = await axios.get("http://13.126.14.109:4000/user/getuser");

      setData(result.data.data); // Use result.data.data to access the array of users
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="user-table-container">
      <button
        className="add-user-button"
        onClick={() => navigate("/createuser")}
      >
        Add User
      </button>
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
                <button className="edit-button">Edit</button>
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

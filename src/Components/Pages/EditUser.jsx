import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditData = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  const baseURL =
    "https://6571a476d61ba6fcc01327e9.mockapi.io/example/curd/react/curdreact";

  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const { name, mobile, email, address } = data;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get(`${baseURL}/${id}`);
      console.log(result);

      const { name, mobile, email, address } = result.data;

      setData({ name, mobile, email, address });
    } catch (err) {
      console.log(err);
    }
  };

  const HandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    //

    try {
      const res = await axios.put(`${baseURL}/${id}`, {
        name,
        mobile,
        email,
        address,
      });
      console.log(res);

      toast.success("Data Successfully Updated");
      toast.success("Data Successfully Updated");
      toast.success("Data Successfully Updated");
      toast.success("Data Successfully Updated");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="border">
        <ToastContainer />
        <div className="bg-danger py-2 px-4 d-flex justify-content-between">
          <h3 className="text-light">Update User Details</h3>
        </div>

        <div className="p-4">
          <form className="" onSubmit={HandleSubmit}>
            <label htmlFor="" className="form-label">
              User Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              required
              className="form-control mb-4"
              placeholder="Enter User Name"
              onChange={HandleChange}
            />
            <label htmlFor="" className="form-label">
              Mobile No.
            </label>
            <input
              type="number"
              name="mobile"
              value={mobile}
              required
              className="form-control mb-4"
              placeholder="Enter Mobile No."
              onChange={HandleChange}
            />
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              required
              className="form-control mb-4"
              placeholder="Enter User Email"
              onChange={HandleChange}
            />
            <label htmlFor="" className="form-label">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={address}
              required
              className="form-control mb-4"
              placeholder="Enter Address"
              onChange={HandleChange}
            />

            <button type="submit" className="btn btn-danger w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditData;

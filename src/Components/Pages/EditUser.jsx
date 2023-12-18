import axios from "axios";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditData = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const baseURL = "http://13.126.14.109:4000/user/updateuser";

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
      userType: "",
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get(`${baseURL}/${_id}`);
      console.log(result);

      const { firstName, lastName, email, password, mobile, userType } =
        result.data;

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("email", email);
      setValue("password", password);
      setValue("mobile", mobile);
      setValue("userType", userType);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`${baseURL}/${_id}`, data);
      console.log(res);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="" className="form-label">
              User Name
            </label>
            <Controller
              name="firstName"
              control={control}
              value=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control mb-4"
                  placeholder="Enter User Name"
                />
              )}
            />

            <label htmlFor="" className="form-label">
              Mobile No.
            </label>
            <Controller
              name="userMobile"
              control={control}
              value=""
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="form-control mb-4"
                  placeholder="Enter Mobile No."
                />
              )}
            />

            <label htmlFor="" className="form-label">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              value=""
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className="form-control mb-4"
                  placeholder="Enter User Email"
                />
              )}
            />

            <label htmlFor="" className="form-label">
              Address
            </label>
            <Controller
              name="password"
              control={control}
              value=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control mb-4"
                  placeholder="Enter Address"
                />
              )}
            />

            <label htmlFor="" className="form-label">
              Mobile
            </label>
            <Controller
              name="mobile"
              control={control}
              value=""
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="form-control mb-4"
                  placeholder="Enter Mobile"
                />
              )}
            />

            <label htmlFor="" className="form-label">
              User Type
            </label>
            <Controller
              name="userType"
              control={control}
              value=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control mb-4"
                  placeholder="Enter User Type"
                />
              )}
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

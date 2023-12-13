import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";

const RegisteredPatient = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  // const dataArray = Object.values(data);

  //   const [loader, setLoader] = useState(false);

  const baseURL = "http://13.126.14.109:5050/patient/getpatient";

  useEffect(() => {
    axios
      .get("http://13.126.14.109:5050/patient/getpatient")
      .then((responce) => {
        console.log(responce.data.result);

        setData(responce.data.result);
      });

    // getData();
  }, []);

  // const getData = async () => {
  //   try {
  //     const result = await axios.get(baseURL);
  //     console.log(result.data.result[0]);
  //     setData(result.data.result[0]);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {

  //   }
  // };
  // console.log("Data=>", data);

  const deleteData = async (id) => {
    await axios.delete(`${baseURL}/${id}`);
    console.log(id);
    // getData();
  };

  return (
    <div className="border">
      <div className="bg-info py-2 px-4 d-flex justify-content-between">
        <h3 className="text-dark">Registered Patients</h3>
        <button
          className="btn btn-success"
          onClick={() => navigate("/dashboard")}
        >
          New Patient +
        </button>
      </div>

      <div className="">
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Aadhar No.</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Marital Status</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.patientDetails.name}</td>
                  <td>{item.patientDetails.mobile}</td>
                  <td>{item.patientDetails.aadhar}</td>
                  <td>{item.patientDetails.sex}</td>
                  <td>{item.patientDetails.age}</td>
                  <td>{item.patientDetails.maritalstatus}</td>
                  <td>
                    {item.patientDetails.address},
                  </td>

                  <td>
                    <Link
                      className="btn btn-warning me-3"
                      to={`/EditData/${item.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteData(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default RegisteredPatient;

import React, { useEffect, useState } from "react";
import { useData } from "./DataContext";
import ReactDOM from "react-dom";
// import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications
import "../../../Assets/Styles/Patientdashboard.css";
import "../../../Assets/Styles/NewPatient.css";
import countries from "../../../common/CommonObj";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPatientDetails = () => {
  //   const updateData = useData();
  const storedUserType = localStorage.getItem("userType");
  const CreatedBy = localStorage.getItem("mobileNumber");

  const [familyMembers, setFamilyMembers] = useState([
    {
      familyMemberName: "",
      familyMemberRelation: "",
      familyMemberAge: "",
      occupation: "",
      monthlyIncome: "",
    },
  ]);
  const [status, setStatus] = useState(0);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    phoneNumber: "",
    aadharNumber: "",
    gender: "empty",
    age: "",
    maritalStatus: "empty",
    rationCardNo: "",
    state: "empty",
    district: "empty",
    taluka: "",
    pincode: "",
    fullAddress: "",

    careTakerName: "",
    careTakerNum1: "",
    careTakerNum2: "",
    particulars: "",

    diseaseName: "",
    diagnoseDate: "",
    diagnoseBy: "",
    investigation1: "",
    investigation2: "",
    investigation3: "",
    currentHospitalName: "",
    currentHospitalAddress: "",
    hospitalNumber: "",
    currentTreatmentDetails: "",
    doctorAdvice: "",

    createdBy: "",
    referredBy: "None",
  });
  const [errors, setErrors] = useState({
    full_name: "",
    phoneNumber: "",
    aadharNumber: "",
    gender: "empty",
    age: "",
    maritalStatus: "empty",
    state: "empty",
    district: "empty",
    taluka: "",
    pincode: "",
    fullAddress: "",

    familyMemberName: "",
    familyMemberRelation: "",
    familyMemberAge: "",
    occupation: "",
    monthlyIncome: "",

    careTakerName: "",
    careTakerNum1: "",
    careTakerNum2: "",
    particulars: "",

    diseaseName: "",
    diagnoseDate: "",
    diagnoseBy: "",
    investigation1: "",
    investigation2: "",
    investigation3: "",
    currentHospitalName: "",
    currentHospitalAddress: "",
    hospitalNumber: "",
    currentTreatmentDetails: "",
    doctorAdvice: "",

    phoneError: "",
  });
  console.log("formData", formData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (
      name === "phoneNumber" ||
      name === "careTakerNum1" ||
      name === "careTakerNum2" ||
      name === "hospitalNumber"
    ) {
      // Remove any non-digit characters (except '-')
      const numericValue = value.replace(/[^0-9-]/g, '');

      // Ensure the length does not exceed 10 digits
      const maxLength = 10;
      const truncatedValue = numericValue.slice(0, maxLength);
  
      // Parse the numeric value as an integer
      const intValue = parseInt(truncatedValue, 10);
  
      // Check if the parsed value is a positive number
      const isValidNumber = !isNaN(intValue) && intValue >= 0;
  
      // Update form data and errors accordingly
      setFormData((prevData) => ({ ...prevData, [name]: isValidNumber ? truncatedValue : "" }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidNumber ? "" : "Please enter a valid 10-digit number",
      }));
    } else if (name === "aadharNumber" || name === "pincode" || name === "rationCardNo") {
      // Remove any non-digit characters
      const numericValue = value.replace(/[^0-9]/g, '');
  
      // Check if the length does not exceed the specified limit
      const maxLength = name === "aadharNumber" ? 12 : name === "pincode" ? 6 : 16;
      const truncatedValue = numericValue.slice(0, maxLength);
  
      // Update form data with the truncated value
      setFormData((prevData) => ({ ...prevData, [name]: truncatedValue }));
    } else if (name === "age") {
      const ageValue = parseInt(value, 10);
  
      // Check if the value is within the desired range (1 to 120)
      const isValidAge = !isNaN(ageValue) && ageValue >= 1 && ageValue <= 120;
  
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidAge ? "" : "Age must be between 1 and 120",
      }));
  
      // Update form data with the validated value
      setFormData((prevData) => ({
        ...prevData,
        [name]: isValidAge ? ageValue : "",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  
 
  const handleFamilyMemInputChange = (index, event) => {
    const { name, value } = event.target;
    const newFamilyMembers = [...familyMembers];
    const ageValue = name === 'familyMemberAge' ? parseInt(value, 10) : value;
  
    // Validate age if the input is for familyMemberAge
    if (name === 'familyMemberAge') {
      const isValidAge = !isNaN(ageValue) && ageValue >= 1 && ageValue <= 120;
  
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`familyMemberAge${index}`]: isValidAge ? '' : 'Age must be between 1 and 120',
      }));
  
      // Update family members only if the age is valid
      if (!isValidAge) {
        newFamilyMembers[index][name] = ''; // Clear the invalid age
        setFamilyMembers(newFamilyMembers);
        return;
      }
    }
  
    newFamilyMembers[index][name] = ageValue;
    setFamilyMembers(newFamilyMembers);
  };
  
  
  const handleAddMember = () => {
    setFamilyMembers((prevMembers) => [
      ...prevMembers,
      {
        familyMemberName: "",
        familyMemberRelation: "",
        familyMemberAge: "",
        occupation: "",
        monthlyIncome: "",
      },
    ]);
  };

  const handleDeleteMember = (index) => {
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers.splice(index, 1);
    setFamilyMembers(newFamilyMembers);
  };

  const handleNext1 = (e) => {
    e.preventDefault();
    var requiredFields = [
      "full_name",
      "phoneNumber",
      "age",
      "state",
      "state",
      "district",
      "pincode",
      "fullAddress",
    ];

    let hasError = false;

    console.log(hasError);

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: " ",
        }));
        hasError = true;
      }
    });
    console.log("hasError", hasError);
    if (hasError) {
      alert("Mandatory fields are required")
    }
    if (!hasError) {
      setStatus(status + 1);
    }
  };
  const handleNext2 = (e) => {
    e.preventDefault();

    // if (familyMembers.length === 0) {
    //   // No family members added, show warning message
    //   toast.warning("At least one family member required");
    //   return;
    // }

    var requiredFields = [
      "familyMemberName",
      "familyMemberRelation",
      "familyMemberAge",
      "occupation",
      "monthlyIncome",
    ];

    let hasError = false;

    console.log(hasError);

    familyMembers.forEach((member, index) => {
      requiredFields.forEach((field) => {
        if (!member[field]) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [`${field}_${index}`]: " required",
          }));
          hasError = true;
        }
      });
    });

    console.log("hasError", hasError);
    if (hasError) {
      alert("Mandatory fields are required")
    }
    if (!hasError) {
      setStatus(status + 1);
    }
  };
  const handleNext3 = (e) => {
    e.preventDefault();
    var requiredFields = ["careTakerName", "careTakerNum1", "particulars"];

    let hasError = false;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: " ",
        }));
        hasError = true;
      }
    });
    if (hasError) {
      alert("Mandatory fields are required")
    }
    if (!hasError) {
      setStatus(status + 1);
    }
  };
  const handleNext4 = (e) => {
    e.preventDefault();
    var requiredFields = [
      "diseaseName",
      "diagnoseDate",
      "diagnoseBy",
      "currentTreatmentDetails",
      "doctorAdvice",
    ];

    let hasError = false;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: " ",
        }));
        hasError = true;
      }
    });
    if (hasError) {
      alert("Mandatory fields are required")
    }
    if (!hasError) {
      handleSubmit();
    }
  };



  const handleSubmit = async () => {
    // e.preventDefault();

    try {
      const patientDetails = {
        name: formData.full_name,
        aadhar: formData.aadharNumber,
        mobile: formData.phoneNumber,
        sex: formData.gender,
        age: formData.age,
        address: formData.fullAddress,
        pin: formData.pincode,
        talukha: formData.taluka,
        district: formData.district,
        state: formData.state,
        maritalstatus: formData.maritalStatus,

        rationCardNo: formData.rationCardNo,
      };
      const familyDetails = familyMembers.map((member, index) => ({
        id: index + 1,
        name: member.familyMemberName,
        relation: member.familyMemberRelation,
        age: member.familyMemberAge,
        occupation: member.occupation,
        monthlyIncome: member.monthlyIncome,
      }));

      const careTakerDetails = {
        name: formData.careTakerName,
        mobile1: formData.careTakerNum1,
        mobile2: formData.careTakerNum2,
        particulars: formData.particulars,
      };

      const diseaseDetails = {
        name: formData.diseaseName,
        diagnoseDate: formData.diagnoseDate,
        diagnoseBy: formData.diagnoseBy,
        investigationDone1: formData.investigation1,
        investigationDone2: formData.investigation2,
        investigationDone3: formData.investigation3,
        currentHospitalName: formData.currentHospitalName,
        currentHospitalAddress: formData.currentHospitalAddress,
        currentHospitalContactNo: formData.hospitalNumber,
        currentTreatmentDetail: formData.currentTreatmentDetails,
        doctorAdviceForFurtherProcess: formData.doctorAdvice,
      };

      const payload = {
        patientDetails: patientDetails,
        familyDetail: familyDetails,
        careTaker: careTakerDetails,
        disease: "Sample Disease",
        diseaseDetail: diseaseDetails,
        createdBy: CreatedBy,
        status: "Patient Registered",
        referredBy: formData.referredBy,
      };
      const url = "https://mmh-jajh.onrender.com/patient/create";
      const response = await axios.post(url, payload);

      if (
        (response && response.status === 200) ||
        response.data.success === true
      ) {
        toast.success("Patient Created Successfully");

        setTimeout(() => {
          {(storedUserType === "Operator" ? (<>{navigate("/opRegistered-patients")}</>): (<>{navigate("/registered-patients")}</>))}
        }, 3000);
      } else {
        toast.error("Error While Creating Patient...");
      }
    } catch (error) {
      console.error("API call error:", error);
      //   notifyError();
    }
  };

  const renderProgressBar = () => {
    const steps = [
      "Patient Details",
      "Family Details",
      "Care Taker Details",
      "Disease Details",
    ];
    return (
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${
              // status === index + 1
              status === index ? "active" : status > index && "completed"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
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
      />{" "}
      <div
        className="stepper-container"
        style={{ width: "80%", margin: "4rem auto" }}
      >
        {renderProgressBar()}
        <form onSubmit={handleSubmit} className="form-div">
          {status === 0 ? (
            <>
              {/* <h2>
                Please fill out all information, so that we may better server
                you.
              </h2> */}

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="referredBy">Referred By</span>
                  {/* <span className="error-message">⁕</span> */}
                </div>

                <input
                  type="text"
                  className="form-input"
                  placeholder="First Name"
                  name="referredBy"
                  value={formData.referredBy}
                  onChange={handleInputChange}
                />
                {/* <div className="error-message">{errors.referredBy}</div> */}
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="full_name">Patient Full Name</span>
                  <span className="error-message">⁕</span>
                </div>

                <input
                  type="text"
                  className="form-input"
                  placeholder="First Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.full_name}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="phone_number">Patient Phone Number</span>
                  <span className="error-message">⁕</span>
                </div>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                {errors.phoneNumber && (
                  <p className="error-message">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="aadhar_number">Aadhar Number</span>
             </div>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Aadhar Number"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.aadharNumber}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="rationCardNo">Ration Card Number</span>
                  {/* <span className="error-message">⁕</span> */}
                </div>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Ration Card Number"
                  name="rationCardNo"
                  value={formData.rationCardNo}
                  onChange={handleInputChange}
                />
                {/* <div className="error-message">{errors.rationCardNo}</div> */}
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="gender">Patient Gender</span>
                  <span className="error-message">⁕</span>
                </div>

                <select
                  name="gender"
                  className="form-input"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="empty">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {/* <div className="error-message">{errors.gender}</div> */}
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="age">Age</span>
                  <span className="error-message">⁕</span>
                </div>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Age"
                  min="1"
                  max="120"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
                <div className="error-message fontBold">{errors.age}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="marital-status">Marital Status</span>
                </div>
                <select
                  name="maritalStatus"
                  className="form-input"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                >
                  <option value="empty">Select Marital Status</option>
                  <option value="married">Married</option>
                  <option value="single">Single</option>
                </select>
                {/* <div className="error-message">{errors.maritalStatus}</div> */}
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="state">State</span>
                  <span className="error-message">⁕</span>
                </div>
                <select
                  value={formData.state}
                  onChange={handleInputChange}
                  name="state"
                  className="form-input"
                >
                  <option value="empty">Select State</option>
                  {countries.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item.state}
                      </option>
                    );
                  })}
                </select>
                {/* <div className="error-message">{errors.state}</div> */}
              </div>
              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="district">District</span>
                  <span className="error-message">⁕</span>
                </div>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="empty">Select District</option>
                  {countries[formData.state] &&
                    countries[formData.state].districts.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
                {/* <div className="error-message">{errors.district}</div> */}
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="Taluka">Taluka</span>
                  {/* <span className="error-message">⁕</span> */}
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Taluka"
                  name="taluka"
                  value={formData.taluka}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.taluka}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="Pincode">Pincode</span>
                  <span className="error-message">⁕</span>
                </div>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.pincode}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="Address">Patient Full Address</span>
                  <span className="error-message">⁕</span>
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Full Address"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.fullAddress}</div>
              </div>

              <button
                style={{ float: "inline-end", width: "100%" }}
                className="full-width-btn form-input"
                // onClick={() => setStatus(2)}
                onClick={handleNext1}
              >
                Next
              </button>
            </>
          ) : status === 1 ? (
            <>
              {familyMembers.map((member, index) => (
                <>
                  <div key={index}>
                    <div class="family-container">
                      <div class="family-item">
                        <div style={{ display: "flex", margin: "0px" }}>
                          <span for="full_name">Full Name</span>
                          <span className="error-message">⁕</span>
                        </div>
                        <input
                          type="text"
                          className="family-input"
                          placeholder="First Name"
                          name="familyMemberName"
                          value={member.familyMemberName}
                          onChange={(e) => handleFamilyMemInputChange(index, e)}
                        />
                        <div className="error-message">
                          {errors.familyMemberName}
                        </div>
                      </div>
                      <div class="family-item">
                        <div style={{ display: "flex", margin: "0px" }}>
                          <span for="full_name">Relation</span>
                          <span className="error-message">⁕</span>
                        </div>
                        <input
                          type="text"
                          className="family-input"
                          placeholder="Relation"
                          name="familyMemberRelation"
                          value={member.familyMemberRelation}
                          onChange={(e) => handleFamilyMemInputChange(index, e)}
                        />
                        <div className="error-message">
                          {errors.familyMemberRelation}
                        </div>
                      </div>
                      <div class="family-item">
                        <div style={{ display: "flex", margin: "0px" }}>
                          <span for="full_name">Age</span>
                          <span className="error-message">⁕</span>
                        </div>
                        <input
                          type="number"
                          className="family-input"
                          placeholder="Age"
                          name="familyMemberAge"
                          value={member.familyMemberAge}
                          onChange={(e) => handleFamilyMemInputChange(index, e)}
                        />
                        <div className="error-message">
                          {errors.familyMemberAge}
                        </div>
                      </div>
                      <div class="family-item">
                        <div style={{ display: "flex", margin: "0px" }}>
                          <span for="full_name">Occupation</span>
                          <span className="error-message">⁕</span>
                        </div>
                        <input
                          type="text"
                          className="family-input"
                          placeholder="Occupation"
                          name="occupation"
                          value={member.occupation}
                          onChange={(e) => handleFamilyMemInputChange(index, e)}
                        />
                        <div className="error-message">{errors.occupation}</div>
                      </div>
                      <div class="family-item">
                        <div style={{ display: "flex", margin: "0px" }}>
                          <span for="full_name">Monthly Income</span>
                          <span className="error-message">⁕</span>
                        </div>
                        <input
                          type="number"
                          className="family-input"
                          placeholder="Monthly Income"
                          name="monthlyIncome"
                          value={member.monthlyIncome}
                          onChange={(e) => handleFamilyMemInputChange(index, e)}
                        />
                        <div className="error-message">
                          {errors.monthlyIncome}
                        </div>
                      </div>
                      <div class="family-item">
                        {" "}
                        <button
                          type="button"
                          className="deleteBtn"
                          onClick={() => handleDeleteMember(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <div style={{ marginRight: "0px" }}>
                <button
                  style={{ width: "fit-content" }}
                  className="addFamilyBtn"
                  type="button"
                  onClick={handleAddMember}
                >
                  Add Family Member
                </button>
              </div>
              <div style={{ width: "100%" }}>
                <button
                  className="previewBtn form-input"
                  onClick={() => setStatus(0)}
                >
                  Previous
                </button>
                <button
                  className="nextBtn form-input"
                  // onClick={() => setStatus(3)}
                  onClick={handleNext2}
                >
                  Next
                </button>
              </div>
            </>
          ) : status === 2 ? (
            <>
              <h2>CareTaker Details</h2>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="full_name">Full Name</span>
                  <span className="error-message">⁕</span>
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="First Name"
                  name="careTakerName"
                  value={formData.careTakerName}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.careTakerName}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="phone_number1">Phone Number 1</span>
                  <span className="error-message">⁕</span>
                </div>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Phone Number"
                  name="careTakerNum1"
                  value={formData.careTakerNum1}
                  onChange={handleInputChange}
                />
                <div className="error-message">
                  {errors.careTakerNum1 || errors.phoneError}
                </div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="phone_number2">Phone Number 2</span>
                </div>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Phone Number"
                  name="careTakerNum2"
                  value={formData.careTakerNum2}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="particulars">Particulars</span>
                  <span className="error-message">⁕</span>
                </div>
                <textarea
                  className="form-input"
                  placeholder="Particulars"
                  name="particulars"
                  value={formData.particulars}
                  onChange={handleInputChange}
                ></textarea>
                <div className="error-message">{errors.particulars}</div>
              </div>
              <div style={{ width: "100%" }}>
                <button
                  className="previewBtn form-input"
                  onClick={() => setStatus(1)}
                >
                  Previous
                </button>
                <button
                  className="nextBtn form-input"
                  // onClick={() => setStatus(3)}
                  onClick={handleNext3}
                >
                  Next
                </button>
              </div>
            </>
          ) : status === 3 ? (
            <>
              <h2>Disease Details</h2>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="full_name">Disease Name</span>
                  <span className="error-message">⁕</span>
                </div>
                <input
                  required
                  type="text"
                  className="form-input"
                  placeholder="First Name"
                  name="diseaseName"
                  value={formData.diseaseName}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.diseaseName}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="Diagnose_date">Diagnose Date</span>
                  <span className="error-message">⁕</span>
                </div>
                <input
                  type="date"
                  className="form-input"
                  placeholder="Diagnose date"
                  name="diagnoseDate"
                  value={formData.diagnoseDate}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.diagnoseDate}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="Diagnose_Dr">Diagnose by Dr</span>
                  <span className="error-message">⁕</span>
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Diagnose by Dr"
                  name="diagnoseBy"
                  value={formData.diagnoseBy}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.diagnoseBy}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="Investigation_1">Investigation Done 1</span>
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Investigation 1"
                  name="investigation1"
                  value={formData.investigation1}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.investigation1}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="Investigation_2">Investigation Done 2</span>
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Investigation 2"
                  name="investigation2"
                  value={formData.investigation2}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.investigation2}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="Investigation_3">Investigation Done 3</span>
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Investigation 3"
                  name="investigation3"
                  value={formData.investigation3}
                  onChange={handleInputChange}
                />
                <div className="error-message">{errors.investigation3}</div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="current_hopital">Current Hospital Name</span>
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Current Hospital Name"
                  name="currentHospitalName"
                  value={formData.currentHospitalName}
                  onChange={handleInputChange}
                />
                <div className="error-message">
                  {errors.currentHospitalName}
                </div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="Address">Address</span>
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Full Address"
                  name="currentHospitalAddress"
                  value={formData.currentHospitalAddress}
                  onChange={handleInputChange}
                />
                <div className="error-message">
                  {errors.currentHospitalAddress}
                </div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="hospitalNumber">Phone Number </span>
                </div>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Phone Number"
                  name="hospitalNumber"
                  value={formData.hospitalNumber}
                  onChange={handleInputChange}
                />
                <div className="error-message">
                  {errors.hospitalNumber || errors.phoneError}
                </div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="current_Treatment">Current Treatment Details</span>
                  <span className="error-message">⁕</span>
                </div>
                <textarea
                  className="form-input"
                  placeholder="Current Treatment Details"
                  name="currentTreatmentDetails"
                  value={formData.currentTreatmentDetails}
                  onChange={handleInputChange}
                ></textarea>
                <div className="error-message">
                  {errors.currentTreatmentDetails}
                </div>
              </div>

              <div className="form-div">
                <div style={{ display: "flex", margin: "0px" }}>
                  <span for="doctor_advice">
                    Doctor's Advice for further process
                  </span>
                  <span className="error-message">⁕</span>
                </div>
                <textarea
                  className="form-input"
                  placeholder="Enter Doctor Advice"
                  name="doctorAdvice"
                  value={formData.doctorAdvice}
                  onChange={handleInputChange}
                ></textarea>
                <div className="error-message">{errors.doctorAdvice}</div>
              </div>

              <div style={{ width: "100%" }}>
                <button
                  className="previewBtn form-input"
                  onClick={() => setStatus(2)}
                >
                  Previous
                </button>
                <button
                  className="nextBtn form-input"
                  onClick={handleNext4}
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPatientDetails;

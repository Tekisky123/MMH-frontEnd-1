import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../Assets/Styles/NewPatient.css";
import countries from "../../../common/CommonObj";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BaseURL from "../../../common/Api";
import {
  MdPerson, MdPhone, MdCreditCard, MdWc, MdCake,
  MdFamilyRestroom, MdWork, MdAttachMoney,
  MdMedicalServices, MdLocalHospital, MdCalendarToday,
  MdDelete, MdAdd, MdArrowForward, MdArrowBack, MdCheckCircle,
  MdLocationOn, MdBadge,
} from "react-icons/md";

const STEPS = ["Patient Details", "Family Details", "Care Taker", "Disease Details"];

/* ══════════════════════════════════════════════════════════════
   Helper components OUTSIDE the main component.
   CRITICAL: If these were defined INSIDE EditPatientDetails,
   React would treat them as new component types on every render,
   unmounting + remounting the DOM input and losing focus.
══════════════════════════════════════════════════════════════ */
const Field = ({ label, required, error, children }) => (
  <div className="npt-field">
    <label className="npt-label">
      {label}
      {required && <span className="npt-req">*</span>}
    </label>
    {children}
    {error && <span className="npt-error">{error}</span>}
  </div>
);

const NptInput = ({ icon: Icon, ...props }) => (
  <div className="npt-input-wrap">
    {Icon && <Icon className="npt-input-icon" />}
    <input className={`npt-input${Icon ? " npt-input--has-icon" : ""}`} {...props} />
  </div>
);

const NptSelect = ({ icon: Icon, children, ...props }) => (
  <div className="npt-input-wrap">
    {Icon && <Icon className="npt-input-icon" />}
    <select className={`npt-input npt-select${Icon ? " npt-input--has-icon" : ""}`} {...props}>
      {children}
    </select>
  </div>
);

const NptTextarea = ({ ...props }) => (
  <textarea className="npt-input npt-textarea" {...props} />
);

/* ════════════════════════════════════════════
   Main Component
════════════════════════════════════════════ */
const EditPatientDetails = () => {
  const { Id } = useParams();
  const storedUserType = localStorage.getItem("userType");
  const CreatedBy = localStorage.getItem("mobileNumber");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [status, setStatus] = useState(0);

  const [familyMembers, setFamilyMembers] = useState([
    { familyMemberName: "", familyMemberRelation: "", familyMemberAge: "", occupation: "", monthlyIncome: "" },
  ]);

  const [formData, setFormData] = useState({
    full_name: "", phoneNumber: "", aadharNumber: "", gender: "empty",
    age: "", maritalStatus: "empty", rationcardnumber: "", state: "empty",
    district: "empty", taluka: "", pincode: "", fullAddress: "",
    careTakerName: "", careTakerNum1: "", careTakerNum2: "", particulars: "",
    diseaseName: "", diagnoseDate: "", diagnoseBy: "",
    investigation1: "", investigation2: "", investigation3: "",
    currentHospitalName: "", currentHospitalAddress: "", hospitalNumber: "",
    currentTreatmentDetails: "", doctorAdvice: "", referredBy: "", createdBy: ""
  });

  const [errors, setErrors] = useState({});

  /* ── Fetch Initial Data ── */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BaseURL}/patient/${Id}`);
        if (response?.status === 200) {
          const pd = response.data.pateint;

          setFormData({
            full_name: pd.patientDetails.name || "",
            phoneNumber: pd.patientDetails.mobile || "",
            aadharNumber: pd.patientDetails.aadhar || "",
            gender: pd.patientDetails.sex || "empty",
            age: pd.patientDetails.age?.toString() || "",
            maritalStatus: pd.patientDetails.maritalstatus || "empty",
            rationcardnumber: pd.patientDetails.rationcardnumber || "",
            state: pd.patientDetails.state || "empty",
            district: pd.patientDetails.district || "empty",
            taluka: pd.patientDetails.talukha || "",
            pincode: pd.patientDetails.pin || "",
            fullAddress: pd.patientDetails.address || "",

            careTakerName: pd.careTaker?.name || "",
            careTakerNum1: pd.careTaker?.mobile1 || "",
            careTakerNum2: pd.careTaker?.mobile2 || "",
            particulars: pd.careTaker?.particulars || "",

            diseaseName: pd.diseaseDetail?.name || pd.disease || "",
            diagnoseDate: pd.diseaseDetail?.diagnoseDate || "",
            diagnoseBy: pd.diseaseDetail?.diagnoseBy || "",
            investigation1: pd.diseaseDetail?.investigationDone1 || "",
            investigation2: pd.diseaseDetail?.investigationDone2 || "",
            investigation3: pd.diseaseDetail?.investigationDone3 || "",
            currentHospitalName: pd.diseaseDetail?.currentHospitalName || "",
            currentHospitalAddress: pd.diseaseDetail?.currentHospitalAddress || "",
            hospitalNumber: pd.diseaseDetail?.currentHospitalContactNo || "",
            currentTreatmentDetails: pd.diseaseDetail?.currentTreatmentDetail || "",
            doctorAdvice: pd.diseaseDetail?.doctorAdviceForFurtherProcess || "",

            createdBy: pd.createdBy || "",
            referredBy: pd.referredBy || "None",
          });

          if (pd.familyDetail && pd.familyDetail.length > 0) {
            setFamilyMembers(pd.familyDetail.map(member => ({
              familyMemberName: member.name || "",
              familyMemberRelation: member.relation || "",
              familyMemberAge: member.age?.toString() || "",
              occupation: member.occupation || "",
              monthlyIncome: member.monthlyIncome?.toString() || "",
            })));
          }
          setDataLoaded(true);
        } else {
          toast.error("Error fetching patient details");
        }
      } catch (error) {
        console.error("API call error:", error);
        toast.error("Error fetching patient details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [Id]);

  /* ── Input handler ── */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["phoneNumber", "careTakerNum1", "careTakerNum2", "hospitalNumber"].includes(name)) {
      const num = value.replace(/[^0-9-]/g, "").slice(0, 10);
      const valid = !isNaN(parseInt(num, 10)) && parseInt(num, 10) >= 0;
      setFormData(p => ({ ...p, [name]: valid ? num : "" }));
      setErrors(p => ({ ...p, [name]: valid ? "" : "Please enter a valid 10-digit number" }));
    } else if (["aadharNumber", "pincode", "rationcardnumber"].includes(name)) {
      const max = name === "aadharNumber" ? 12 : name === "pincode" ? 6 : 16;
      setFormData(p => ({ ...p, [name]: value.replace(/[^0-9]/g, "").slice(0, max) }));
    } else if (name === "age") {
      const age = parseInt(value, 10);
      const ok = !isNaN(age) && age >= 1 && age <= 120;
      setErrors(p => ({ ...p, [name]: ok ? "" : "Age must be 1–120" }));
      setFormData(p => ({ ...p, [name]: ok ? age : (value === "" ? "" : p[name]) }));
    } else {
      setErrors(p => ({ ...p, [name]: "" }));
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  /* ── Family member handler ── */
  const handleFamilyMemInputChange = (index, e) => {
    const { name, value } = e.target;
    const copy = [...familyMembers];
    if (name === "familyMemberAge") {
      const age = parseInt(value, 10);
      const ok = !isNaN(age) && age >= 1 && age <= 120;
      setErrors(p => ({ ...p, [`familyMemberAge${index}`]: ok ? "" : "Age must be 1–120" }));
      if (!ok && value !== "") return; // keep old valid value or clear
      copy[index][name] = ok ? age : "";
    } else {
      copy[index][name] = value;
    }
    setFamilyMembers(copy);
  };

  const handleAddMember = () => setFamilyMembers(p => [
    ...p, { familyMemberName: "", familyMemberRelation: "", familyMemberAge: "", occupation: "", monthlyIncome: "" },
  ]);

  const handleDeleteMember = (i) => setFamilyMembers(p => p.filter((_, idx) => idx !== i));

  /* ── Validation ── */
  const validateFields = (fields) => {
    let hasError = false;
    fields.forEach(f => {
      // For empty strings or default "empty" selects
      if (!formData[f] || formData[f] === "empty") {
        setErrors(p => ({ ...p, [f]: "This field is required" }));
        hasError = true;
      }
    });
    return hasError;
  };

  const handleNext1 = (e) => {
    e.preventDefault();
    if (!validateFields(["full_name", "phoneNumber", "age", "state", "district", "fullAddress"])) {
      setStatus(1);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const handleNext2 = (e) => {
    e.preventDefault();
    let hasError = false;

    // Check if the user completely left the single default member blank
    const isSingleEmptyMember = familyMembers.length === 1 &&
      !familyMembers[0].familyMemberName &&
      !familyMembers[0].familyMemberRelation &&
      !familyMembers[0].familyMemberAge &&
      !familyMembers[0].occupation &&
      !familyMembers[0].monthlyIncome;

    if (!isSingleEmptyMember) {
      familyMembers.forEach((m, i) => {
        // If they added a member, all its fields are required
        ["familyMemberName", "familyMemberRelation", "familyMemberAge", "occupation", "monthlyIncome"].forEach(f => {
          if (!m[f]) { setErrors(p => ({ ...p, [`${f}_${i}`]: "Required" })); hasError = true; }
        });
      });
    }

    if (!hasError) setStatus(2); else toast.error("Please fill all required fields for the added family members");
  };

  const handleNext3 = (e) => {
    e.preventDefault();
    if (!validateFields(["careTakerName", "careTakerNum1", "particulars"])) setStatus(3);
    else toast.error("Please fill all required fields");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields(["diseaseName", "diagnoseDate", "diagnoseBy", "currentTreatmentDetails", "doctorAdvice"])) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    setFormSubmitted(true);

    try {
      const payload = {
        patientDetails: {
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
          rationcardnumber: formData.rationcardnumber,
        },
        familyDetail: familyMembers.map((m, i) => ({
          id: i + 1,
          name: m.familyMemberName,
          relation: m.familyMemberRelation,
          age: m.familyMemberAge,
          occupation: m.occupation,
          monthlyIncome: m.monthlyIncome,
        })),
        careTaker: {
          name: formData.careTakerName,
          mobile1: formData.careTakerNum1,
          mobile2: formData.careTakerNum2,
          particulars: formData.particulars,
        },
        disease: formData.diseaseName, // mapping both for legacy
        diseaseDetail: {
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
        },
        createdBy: formData.createdBy || CreatedBy,
        referredBy: formData.referredBy,
      };

      const res = await axios.put(`${BaseURL}/patient/${Id}`, payload);
      if (res?.status === 200 || res?.data?.success) {
        toast.success("Patient Updated Successfully!");
        setTimeout(() => {
          navigate(storedUserType === "Operator" ? "/opRegistered-patients" : "/registered-patients");
        }, 1500);
      } else {
        toast.error("Failed to update patient");
        setFormSubmitted(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
      setFormSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  /* ── Renders ── */
  return (
    <div className="npt-root">
      {loading && (
        <div className="npt-loader-overlay">
          <div className="npt-spinner" />
          <div style={{ marginTop: 16, color: "#1e4d26", fontWeight: "bold" }}>
            {dataLoaded ? "Updating Patient..." : "Loading Patient Data..."}
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={4000} theme="colored" />

      <div className="npt-wrapper">
        {/* Page header inside wrapper */}
        <div className="npt-card-header" style={{ borderRadius: '16px', marginBottom: '24px', textAlign: 'center' }}>
          <h1 className="npt-card-title" style={{ fontSize: '1.8rem', color: '#1a1a2e' }}>Edit Patient Details</h1>
          <p className="npt-card-subtitle">Update and save patient information</p>
        </div>

        {/* Stepper */}
        <div className="npt-stepper">
          {STEPS.map((step, idx) => {
            const isActive = status === idx;
            const isDone = status > idx;
            return (
              <React.Fragment key={idx}>
                <div className={`npt-step ${isActive ? "npt-step--active" : ""} ${isDone ? "npt-step--done" : ""}`}>
                  <div className="npt-step-circle">{isDone ? <MdCheckCircle /> : idx + 1}</div>
                  <div className="npt-step-label">{step}</div>
                </div>
                {idx < STEPS.length - 1 && <div className={`npt-step-line ${isDone ? "npt-step-line--done" : ""}`} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="npt-card">
          <div className="npt-card-header">
            <h2 className="npt-card-title">{STEPS[status]}</h2>
            <span className="npt-card-step-badge">Step {status + 1} of {STEPS.length}</span>
          </div>

          {status === 0 && (
            <form onSubmit={handleNext1} className="npt-form">
              <div className="npt-form-body">
                <h2 className="npt-section-title"><MdPerson /> Personal Information</h2>

                <div className="npt-grid-3">
                  <Field label="Referred By" error={errors.referredBy}>
                    <NptInput icon={MdPerson} name="referredBy" placeholder="e.g. Dr. Smith" value={formData.referredBy} onChange={handleInputChange} />
                  </Field>
                  <Field label="Full Name" required error={errors.full_name}>
                    <NptInput icon={MdPerson} name="full_name" placeholder="John Doe" value={formData.full_name} onChange={handleInputChange} />
                  </Field>
                  <Field label="Phone Number" required error={errors.phoneNumber}>
                    <NptInput icon={MdPhone} type="text" name="phoneNumber" placeholder="9876543210" value={formData.phoneNumber} onChange={handleInputChange} maxLength="10" />
                  </Field>
                  <Field label="Aadhar Number" error={errors.aadharNumber}>
                    <NptInput icon={MdBadge} type="text" name="aadharNumber" placeholder="XXXX XXXX XXXX" value={formData.aadharNumber} onChange={handleInputChange} maxLength="12" />
                  </Field>
                  <Field label="Ration Card No." error={errors.rationcardnumber}>
                    <NptInput icon={MdCreditCard} name="rationcardnumber" placeholder="RC Number" value={formData.rationcardnumber} onChange={handleInputChange} />
                  </Field>
                  <Field label="Gender" required error={errors.gender}>
                    <NptSelect icon={MdWc} name="gender" value={formData.gender} onChange={handleInputChange}>
                      <option value="empty">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="Other">Other</option>
                    </NptSelect>
                  </Field>
                  <Field label="Age (Years)" required error={errors.age}>
                    <NptInput icon={MdCake} type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} min="1" max="120" />
                  </Field>
                  <Field label="Marital Status" error={errors.maritalStatus}>
                    <NptSelect icon={MdFamilyRestroom} name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
                      <option value="empty">Select Status</option>
                      <option value="married">Married</option>
                      <option value="single">Single</option>
                      <option value="widowed">Widowed</option>
                      <option value="divorced">Divorced</option>
                    </NptSelect>
                  </Field>
                </div>

                <h2 className="npt-section-title" style={{ marginTop: 32 }}><MdLocationOn /> Location & Address</h2>
                <div className="npt-grid-3">
                  <Field label="State" required error={errors.state}>
                    <NptSelect name="state" value={formData.state} onChange={handleInputChange}>
                      <option value="empty">Select State</option>
                      {countries.map((item, index) => <option key={index} value={index}>{item.state}</option>)}
                    </NptSelect>
                  </Field>
                  <Field label="District" required error={errors.district}>
                    <NptSelect name="district" value={formData.district} onChange={handleInputChange}>
                      <option value="empty">Select District</option>
                      {formData.state !== "empty" && countries[formData.state]?.districts.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </NptSelect>
                  </Field>
                  <Field label="Taluka" error={errors.taluka}>
                    <NptInput name="taluka" placeholder="Taluka" value={formData.taluka} onChange={handleInputChange} />
                  </Field>
                  <Field label="Pincode" error={errors.pincode}>
                    <NptInput type="text" name="pincode" placeholder="123456" value={formData.pincode} onChange={handleInputChange} maxLength="6" />
                  </Field>
                </div>

                <div className="npt-grid-1" style={{ marginTop: 16 }}>
                  <Field label="Full Residential Address" required error={errors.fullAddress}>
                    <NptTextarea name="fullAddress" placeholder="Enter complete address..." rows="3" value={formData.fullAddress} onChange={handleInputChange} />
                  </Field>
                </div>

                <div className="npt-form-actions">
                  <button type="submit" className="npt-btn npt-btn--primary">Next Step <MdArrowForward /></button>
                </div>
              </div>
            </form>
          )}

          {status === 1 && (
            <form onSubmit={handleNext2} className="npt-form">
              <div className="npt-form-body">
                <h2 className="npt-section-title"><MdFamilyRestroom /> Family Members</h2>
                <p className="npt-help-text">Add details for all dependent family members.</p>

                <div className="npt-family-list">
                  {familyMembers.map((member, index) => (
                    <div key={index} className="npt-family-block">
                      <div className="npt-family-block-header">
                        <span><MdFamilyRestroom /> Member {index + 1}</span>
                        {familyMembers.length > 1 && (
                          <button type="button" className="npt-delete-btn" onClick={() => handleDeleteMember(index)} title="Remove member">
                            <MdDelete /> Remove
                          </button>
                        )}
                      </div>

                      <div className="npt-grid-3">
                        <Field label="Name" error={errors[`familyMemberName_${index}`]}>
                          <NptInput icon={MdPerson} name="familyMemberName" placeholder="Full Name" value={member.familyMemberName} onChange={(e) => handleFamilyMemInputChange(index, e)} />
                        </Field>
                        <Field label="Relation (e.g. Son)" error={errors[`familyMemberRelation_${index}`]}>
                          <NptInput icon={MdFamilyRestroom} name="familyMemberRelation" placeholder="Relation" value={member.familyMemberRelation} onChange={(e) => handleFamilyMemInputChange(index, e)} />
                        </Field>
                        <Field label="Age" error={errors[`familyMemberAge${index}`] || errors[`familyMemberAge_${index}`]}>
                          <NptInput icon={MdCake} type="number" name="familyMemberAge" placeholder="Age" min="1" max="120" value={member.familyMemberAge} onChange={(e) => handleFamilyMemInputChange(index, e)} />
                        </Field>
                        <Field label="Occupation" error={errors[`occupation_${index}`]}>
                          <NptInput icon={MdWork} name="occupation" placeholder="Occupation" value={member.occupation} onChange={(e) => handleFamilyMemInputChange(index, e)} />
                        </Field>
                        <Field label="Monthly Income (₹)" error={errors[`monthlyIncome_${index}`]}>
                          <NptInput icon={MdAttachMoney} type="number" name="monthlyIncome" placeholder="0.00" value={member.monthlyIncome} onChange={(e) => handleFamilyMemInputChange(index, e)} />
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" className="npt-btn npt-btn--secondary" onClick={handleAddMember} style={{ marginTop: 16 }}>
                  <MdAdd /> Add Another Member
                </button>

                <div className="npt-form-actions npt-form-actions--between">
                  <button type="button" className="npt-btn npt-btn--outline" onClick={() => setStatus(0)}>
                    <MdArrowBack /> Back
                  </button>
                  <button type="submit" className="npt-btn npt-btn--primary">
                    Next Step <MdArrowForward />
                  </button>
                </div>
              </div>
            </form>
          )}

          {status === 2 && (
            <form onSubmit={handleNext3} className="npt-form">
              <div className="npt-form-body">
                <h2 className="npt-section-title"><MdPhone /> Emergency / Care Taker Details</h2>
                <div className="npt-grid-2">
                  <Field label="Care Taker Name" required error={errors.careTakerName}>
                    <NptInput icon={MdPerson} name="careTakerName" placeholder="Full Name" value={formData.careTakerName} onChange={handleInputChange} />
                  </Field>
                  <Field label="Primary Mobile No." required error={errors.careTakerNum1}>
                    <NptInput icon={MdPhone} type="text" name="careTakerNum1" placeholder="10-digit number" value={formData.careTakerNum1} onChange={handleInputChange} maxLength="10" />
                  </Field>
                  <Field label="Secondary Mobile No." error={errors.careTakerNum2}>
                    <NptInput icon={MdPhone} type="text" name="careTakerNum2" placeholder="Optional 10-digit number" value={formData.careTakerNum2} onChange={handleInputChange} maxLength="10" />
                  </Field>
                  <Field label="Particulars (Relation / Info)" required error={errors.particulars}>
                    <NptInput name="particulars" placeholder="e.g. Neighbor, Brother" value={formData.particulars} onChange={handleInputChange} />
                  </Field>
                </div>

                <div className="npt-form-actions npt-form-actions--between">
                  <button type="button" className="npt-btn npt-btn--outline" onClick={() => setStatus(1)}>
                    <MdArrowBack /> Back
                  </button>
                  <button type="submit" className="npt-btn npt-btn--primary">
                    Next Step <MdArrowForward />
                  </button>
                </div>
              </div>
            </form>
          )}

          {status === 3 && (
            <form onSubmit={handleSubmit} className="npt-form">
              <div className="npt-form-body">
                <h2 className="npt-section-title"><MdMedicalServices /> Medical & Disease Details</h2>

                <div className="npt-grid-2">
                  <Field label="Disease Name" required error={errors.diseaseName}>
                    <NptInput icon={MdMedicalServices} name="diseaseName" placeholder="e.g. Cancer, Tuberculosis" value={formData.diseaseName} onChange={handleInputChange} />
                  </Field>
                  <Field label="Diagnose Date" required error={errors.diagnoseDate}>
                    <NptInput icon={MdCalendarToday} type="date" name="diagnoseDate" value={formData.diagnoseDate} onChange={handleInputChange} />
                  </Field>
                  <Field label="Diagnosed By (Doctor Name)" required error={errors.diagnoseBy}>
                    <NptInput icon={MdPerson} name="diagnoseBy" placeholder="Dr. Name" value={formData.diagnoseBy} onChange={handleInputChange} />
                  </Field>
                </div>

                <div className="npt-grid-3" style={{ marginTop: 16 }}>
                  <Field label="Investigation 1" error={errors.investigation1}>
                    <NptInput name="investigation1" placeholder="Blood test, MRI, etc." value={formData.investigation1} onChange={handleInputChange} />
                  </Field>
                  <Field label="Investigation 2" error={errors.investigation2}>
                    <NptInput name="investigation2" placeholder="Blood test, MRI, etc." value={formData.investigation2} onChange={handleInputChange} />
                  </Field>
                  <Field label="Investigation 3" error={errors.investigation3}>
                    <NptInput name="investigation3" placeholder="Blood test, MRI, etc." value={formData.investigation3} onChange={handleInputChange} />
                  </Field>
                </div>

                <h2 className="npt-section-title" style={{ marginTop: 32 }}><MdLocalHospital /> Current Hospital Info</h2>
                <div className="npt-grid-2">
                  <Field label="Hospital Name" error={errors.currentHospitalName}>
                    <NptInput icon={MdLocalHospital} name="currentHospitalName" placeholder="Hospital Name" value={formData.currentHospitalName} onChange={handleInputChange} />
                  </Field>
                  <Field label="Hospital Contact No." error={errors.hospitalNumber}>
                    <NptInput icon={MdPhone} type="text" name="hospitalNumber" placeholder="Contact number" value={formData.hospitalNumber} onChange={handleInputChange} maxLength="10" />
                  </Field>
                </div>

                <div className="npt-grid-1" style={{ marginTop: 16 }}>
                  <Field label="Hospital Address" error={errors.currentHospitalAddress}>
                    <NptTextarea name="currentHospitalAddress" placeholder="Full address of the hospital..." rows="2" value={formData.currentHospitalAddress} onChange={handleInputChange} />
                  </Field>
                  <Field label="Current Treatment Details" required error={errors.currentTreatmentDetails}>
                    <NptTextarea name="currentTreatmentDetails" placeholder="Describe the ongoing treatment..." rows="3" value={formData.currentTreatmentDetails} onChange={handleInputChange} />
                  </Field>
                  <Field label="Doctor's Advice / Further Process" required error={errors.doctorAdvice}>
                    <NptTextarea name="doctorAdvice" placeholder="Doctor's recommendations for next steps..." rows="3" value={formData.doctorAdvice} onChange={handleInputChange} />
                  </Field>
                </div>

                <div className="npt-form-actions npt-form-actions--between">
                  <button type="button" className="npt-btn npt-btn--outline" onClick={() => setStatus(2)} disabled={formSubmitted}>
                    <MdArrowBack /> Back
                  </button>
                  <button type="submit" className="npt-btn npt-btn--success" disabled={formSubmitted || loading}>
                    {loading ? "Updating..." : "Update Patient Data"} <MdCheckCircle />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPatientDetails;

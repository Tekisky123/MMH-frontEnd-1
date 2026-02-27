import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../Assets/Styles/NewPatient.css";
import countries from "../../../common/CommonObj";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
   CRITICAL: If these were defined INSIDE AddPatientDetails,
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
const AddPatientDetails = () => {
  const storedUserType = localStorage.getItem("userType");
  const CreatedBy = localStorage.getItem("mobileNumber");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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
    currentTreatmentDetails: "", doctorAdvice: "", referredBy: "",
  });

  const [errors, setErrors] = useState({});

  /* ── Input handler ── */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["phoneNumber", "careTakerNum1", "careTakerNum2", "hospitalNumber"].includes(name)) {
      const num = value.replace(/[^0-9-]/g, "").slice(0, 10);
      const valid = !isNaN(parseInt(num, 10)) && parseInt(num, 10) >= 0;
      setFormData(p => ({ ...p, [name]: valid ? num : "" }));
      setErrors(p => ({ ...p, [name]: valid ? "" : "Please enter a valid 10-digit number" }));
    } else if (["aadharNumber", "pincode"].includes(name)) {
      const max = name === "aadharNumber" ? 12 : 6;
      setFormData(p => ({ ...p, [name]: value.replace(/[^0-9]/g, "").slice(0, max) }));
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
      if (!ok) { copy[index][name] = ""; setFamilyMembers(copy); return; }
      copy[index][name] = age;
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
      if (!formData[f]) {
        setErrors(p => ({ ...p, [f]: "This field is required" }));
        hasError = true;
      }
    });
    return hasError;
  };

  const handleNext1 = (e) => {
    e.preventDefault();
    if (!validateFields(["full_name", "phoneNumber", "age", "state", "district", "fullAddress"])) setStatus(1);
    else toast.error("Please fill all required fields");
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

  const handleNext4 = (e) => {
    e.preventDefault();
    if (!validateFields(["diseaseName", "diagnoseDate", "diagnoseBy", "currentTreatmentDetails", "doctorAdvice"])) handleSubmit();
    else toast.error("Please fill all required fields");
  };

  /* ── Submit ── */
  const handleSubmit = async () => {
    if (formSubmitted) return;
    setLoading(true);
    try {
      const payload = {
        patientDetails: {
          name: formData.full_name, aadhar: formData.aadharNumber, mobile: formData.phoneNumber,
          sex: formData.gender, age: formData.age, address: formData.fullAddress,
          pin: formData.pincode, talukha: formData.taluka, district: formData.district,
          state: formData.state, maritalstatus: formData.maritalStatus,
          rationcardnumber: formData.rationcardnumber,
        },
        familyDetail: familyMembers.map((m, i) => ({
          id: i + 1, name: m.familyMemberName, relation: m.familyMemberRelation,
          age: m.familyMemberAge, occupation: m.occupation, monthlyIncome: m.monthlyIncome,
        })),
        careTaker: {
          name: formData.careTakerName, mobile1: formData.careTakerNum1,
          mobile2: formData.careTakerNum2, particulars: formData.particulars,
        },
        disease: "Sample Disease",
        diseaseDetail: {
          name: formData.diseaseName, diagnoseDate: formData.diagnoseDate,
          diagnoseBy: formData.diagnoseBy, investigationDone1: formData.investigation1,
          investigationDone2: formData.investigation2, investigationDone3: formData.investigation3,
          currentHospitalName: formData.currentHospitalName,
          currentHospitalAddress: formData.currentHospitalAddress,
          currentHospitalContactNo: formData.hospitalNumber,
          currentTreatmentDetail: formData.currentTreatmentDetails,
          doctorAdviceForFurtherProcess: formData.doctorAdvice,
        },
        createdBy: CreatedBy,
        status: "Patient Registered",
        referredBy: formData.referredBy,
      };
      const res = await axios.post(`${BaseURL}/patient/create`, payload);
      if (res && (res.status === 200 || res.data.success)) {
        toast.success("Patient Registered Successfully!");
        setFormSubmitted(true);
        setTimeout(() => navigate(storedUserType === "Operator" ? "/opRegistered-patients" : "/registered-patients"), 900);
      } else {
        toast.error("Error while registering patient.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ════════════════ JSX ════════════════ */
  return (
    <div className="npt-root">
      {loading && (
        <div className="npt-loader-overlay">
          <div className="npt-spinner" />
        </div>
      )}

      <ToastContainer position="top-right" autoClose={4000} theme="colored" />

      <div className="npt-wrapper">
        {/* Page header inside wrapper */}
        <div className="npt-card-header" style={{ borderRadius: '16px', marginBottom: '24px', textAlign: 'center' }}>
          <h1 className="npt-card-title" style={{ fontSize: '1.8rem', color: '#1a1a2e' }}>New Patient Registration</h1>
          <p className="npt-card-subtitle">Fill in all required information across the steps below</p>
        </div>

        {/* Stepper */}
        <div className="npt-stepper">
          {STEPS.map((label, i) => (
            <div key={i} className={`npt-step ${i === status ? "npt-step--active" : i < status ? "npt-step--done" : ""}`}>
              <div className="npt-step-circle">
                {i < status ? <MdCheckCircle /> : <span>{i + 1}</span>}
              </div>
              <span className="npt-step-label">{label}</span>
              {i < STEPS.length - 1 && <div className="npt-step-line" />}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="npt-card">
          <div className="npt-card-header">
            <h2 className="npt-card-title">{STEPS[status]}</h2>
            <span className="npt-card-step-badge">Step {status + 1} of {STEPS.length}</span>
          </div>

          <form onSubmit={e => e.preventDefault()} className="npt-form">

            {/* ── STEP 1: Patient Details ── */}
            {status === 0 && (
              <div className="npt-form-body">
                <Field label="Referred By" error={errors.referredBy}>
                  <NptInput icon={MdBadge} type="text" name="referredBy" placeholder="Referred by" value={formData.referredBy} onChange={handleInputChange} />
                </Field>

                <div className="npt-grid-2">
                  <Field label="Patient Full Name" required error={errors.full_name}>
                    <NptInput icon={MdPerson} type="text" name="full_name" placeholder="Full Name"
                      value={formData.full_name} onChange={handleInputChange}
                      onKeyDown={e => { if (!/^[a-zA-Z\s]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") e.preventDefault(); }} />
                  </Field>
                  <Field label="Phone Number" required error={errors.phoneNumber}>
                    <NptInput icon={MdPhone} type="tel" name="phoneNumber" placeholder="10-digit number" value={formData.phoneNumber} onChange={handleInputChange} />
                  </Field>
                </div>

                <div className="npt-grid-2">
                  <Field label="Aadhar Number" error={errors.aadharNumber}>
                    <NptInput icon={MdCreditCard} type="text" name="aadharNumber" placeholder="12-digit Aadhar" value={formData.aadharNumber} onChange={handleInputChange} />
                  </Field>
                  <Field label="Ration Card Number" error={errors.rationcardnumber}>
                    <NptInput icon={MdCreditCard} type="text" name="rationcardnumber" placeholder="Ration Card No." value={formData.rationcardnumber} onChange={handleInputChange} />
                  </Field>
                </div>

                <div className="npt-grid-3">
                  <Field label="Gender" required error={errors.gender}>
                    <NptSelect icon={MdWc} name="gender" value={formData.gender} onChange={handleInputChange}>
                      <option value="empty">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="Other">Other</option>
                    </NptSelect>
                  </Field>
                  <Field label="Age" required error={errors.age}>
                    <NptInput icon={MdCake} type="text" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
                  </Field>
                  <Field label="Marital Status" error={errors.maritalStatus}>
                    <NptSelect icon={MdWc} name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
                      <option value="empty">Select Status</option>
                      <option value="married">Married</option>
                      <option value="single">Single</option>
                    </NptSelect>
                  </Field>
                </div>

                <div className="npt-grid-2">
                  <Field label="State" required error={errors.state}>
                    <NptSelect icon={MdLocationOn} name="state" value={formData.state} onChange={handleInputChange}>
                      <option value="empty">Select State</option>
                      {countries.map((item, i) => <option key={i} value={i}>{item.state}</option>)}
                    </NptSelect>
                  </Field>
                  <Field label="District" required error={errors.district}>
                    <NptSelect icon={MdLocationOn} name="district" value={formData.district} onChange={handleInputChange}>
                      <option value="empty">Select District</option>
                      {countries[formData.state]?.districts.map((d, i) => <option key={i} value={d}>{d}</option>)}
                    </NptSelect>
                  </Field>
                </div>

                <div className="npt-grid-2">
                  <Field label="Taluka" error={errors.taluka}>
                    <NptInput icon={MdLocationOn} type="text" name="taluka" placeholder="Taluka" value={formData.taluka} onChange={handleInputChange} />
                  </Field>
                  <Field label="Pincode" error={errors.pincode}>
                    <NptInput icon={MdLocationOn} type="text" name="pincode" placeholder="6-digit Pincode" value={formData.pincode} onChange={handleInputChange} />
                  </Field>
                </div>

                <Field label="Full Address" required error={errors.fullAddress}>
                  <NptInput icon={MdLocationOn} type="text" name="fullAddress" placeholder="Full residential address" value={formData.fullAddress} onChange={handleInputChange} />
                </Field>

                <div className="npt-action-row npt-action-row--end">
                  <button type="button" className="npt-btn npt-btn--primary" onClick={handleNext1}>
                    Next <MdArrowForward />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Family Details ── */}
            {status === 1 && (
              <div className="npt-form-body">
                {familyMembers.map((member, index) => (
                  <div key={index} className="npt-family-block">
                    <div className="npt-family-block-header">
                      <span><MdFamilyRestroom /> Member {index + 1}</span>
                      {familyMembers.length > 1 && (
                        <button type="button" className="npt-delete-btn" onClick={() => handleDeleteMember(index)}>
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

                <button type="button" className="npt-btn npt-btn--add" onClick={handleAddMember}>
                  <MdAdd /> Add Family Member
                </button>

                <div className="npt-action-row npt-action-row--between">
                  <button type="button" className="npt-btn npt-btn--ghost" onClick={() => setStatus(0)}>
                    <MdArrowBack /> Previous
                  </button>
                  <button type="button" className="npt-btn npt-btn--primary" onClick={handleNext2}>
                    Next <MdArrowForward />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Caretaker Details ── */}
            {status === 2 && (
              <div className="npt-form-body">
                <Field label="Caretaker Full Name" required error={errors.careTakerName}>
                  <NptInput icon={MdPerson} type="text" name="careTakerName" placeholder="Full Name" value={formData.careTakerName} onChange={handleInputChange} />
                </Field>
                <div className="npt-grid-2">
                  <Field label="Phone Number 1" required error={errors.careTakerNum1}>
                    <NptInput icon={MdPhone} type="tel" name="careTakerNum1" placeholder="Primary number" value={formData.careTakerNum1} onChange={handleInputChange} />
                  </Field>
                  <Field label="Phone Number 2" error={errors.careTakerNum2}>
                    <NptInput icon={MdPhone} type="tel" name="careTakerNum2" placeholder="Alternate number" value={formData.careTakerNum2} onChange={handleInputChange} />
                  </Field>
                </div>
                <Field label="Particulars" required error={errors.particulars}>
                  <NptTextarea name="particulars" rows={4} placeholder="Particulars / Notes about the caretaker" value={formData.particulars} onChange={handleInputChange} />
                </Field>

                <div className="npt-action-row npt-action-row--between">
                  <button type="button" className="npt-btn npt-btn--ghost" onClick={() => setStatus(1)}>
                    <MdArrowBack /> Previous
                  </button>
                  <button type="button" className="npt-btn npt-btn--primary" onClick={handleNext3}>
                    Next <MdArrowForward />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: Disease Details ── */}
            {status === 3 && (
              <div className="npt-form-body">
                <div className="npt-grid-2">
                  <Field label="Disease Name" required error={errors.diseaseName}>
                    <NptInput icon={MdMedicalServices} type="text" name="diseaseName" placeholder="Disease / Condition" value={formData.diseaseName} onChange={handleInputChange} />
                  </Field>
                  <Field label="Diagnose Date" required error={errors.diagnoseDate}>
                    <NptInput icon={MdCalendarToday} type="date" name="diagnoseDate" value={formData.diagnoseDate} onChange={handleInputChange} />
                  </Field>
                </div>

                <Field label="Diagnosed By Doctor" required error={errors.diagnoseBy}>
                  <NptInput icon={MdPerson} type="text" name="diagnoseBy" placeholder="Doctor's name" value={formData.diagnoseBy} onChange={handleInputChange} />
                </Field>

                <div className="npt-section-divider">Investigations Done (Optional)</div>
                <div className="npt-grid-3">
                  <Field label="Investigation 1" error={errors.investigation1}>
                    <NptInput type="text" name="investigation1" placeholder="Investigation 1" value={formData.investigation1} onChange={handleInputChange} />
                  </Field>
                  <Field label="Investigation 2" error={errors.investigation2}>
                    <NptInput type="text" name="investigation2" placeholder="Investigation 2" value={formData.investigation2} onChange={handleInputChange} />
                  </Field>
                  <Field label="Investigation 3" error={errors.investigation3}>
                    <NptInput type="text" name="investigation3" placeholder="Investigation 3" value={formData.investigation3} onChange={handleInputChange} />
                  </Field>
                </div>

                <div className="npt-section-divider">Current Hospital (Optional)</div>
                <div className="npt-grid-2">
                  <Field label="Hospital Name" error={errors.currentHospitalName}>
                    <NptInput icon={MdLocalHospital} type="text" name="currentHospitalName" placeholder="Hospital Name" value={formData.currentHospitalName} onChange={handleInputChange} />
                  </Field>
                  <Field label="Hospital Phone" error={errors.hospitalNumber}>
                    <NptInput icon={MdPhone} type="tel" name="hospitalNumber" placeholder="Contact Number" value={formData.hospitalNumber} onChange={handleInputChange} />
                  </Field>
                </div>
                <Field label="Hospital Address" error={errors.currentHospitalAddress}>
                  <NptInput icon={MdLocationOn} type="text" name="currentHospitalAddress" placeholder="Full hospital address" value={formData.currentHospitalAddress} onChange={handleInputChange} />
                </Field>

                <div className="npt-section-divider">Treatment Summary</div>
                <Field label="Current Treatment Details" required error={errors.currentTreatmentDetails}>
                  <NptTextarea name="currentTreatmentDetails" rows={4} placeholder="Describe current treatment details…" value={formData.currentTreatmentDetails} onChange={handleInputChange} />
                </Field>
                <Field label="Doctor's Advice for Further Process" required error={errors.doctorAdvice}>
                  <NptTextarea name="doctorAdvice" rows={4} placeholder="Enter doctor's advice…" value={formData.doctorAdvice} onChange={handleInputChange} />
                </Field>

                <div className="npt-action-row npt-action-row--between">
                  <button type="button" className="npt-btn npt-btn--ghost" onClick={() => setStatus(2)}>
                    <MdArrowBack /> Previous
                  </button>
                  <button type="button" className="npt-btn npt-btn--submit" onClick={handleNext4} disabled={formSubmitted || loading}>
                    {loading ? <><span className="npt-spin" /> Submitting…</> : <><MdCheckCircle /> Submit</>}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatientDetails;

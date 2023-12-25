import React, { useEffect, useState } from "react";
import { useData } from "./DataContext";
import ReactDOM from "react-dom";
// import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications
import "../../../Assets/Styles/Patientdashboard.css";
import "../../../Assets/Styles/NewPatient.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPatientDetails = () => {
  //   const updateData = useData();
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
  
      // Limit the input to a maximum of 10 digits
      const truncatedValue = numericValue.slice(0, 10);
  
      // Update form data and errors accordingly
      setFormData((prevData) => ({ ...prevData, [name]: truncatedValue }));
      
      const isValidNumber = /^\d{1,10}$/.test(truncatedValue);
  
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidNumber ? "" : "Please enter a valid number (up to 10 digits)",
      }));
    } else if (name === "aadharNumber" || name === "pincode" || name === "rationCardNo") {
      // ... (rest of your existing code)
    } else if (name === "age") {
      // ... (rest of your existing code)
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

    if (!hasError) {
      handleSubmit();
    }
  };

  const countries = [
    {
      state: "Andhra Pradesh",
      districts: [
        "Anantapur",
        "Chittoor",
        "East Godavari",
        "Guntur",
        "Krishna",
        "Kurnool",
        "Nellore",
        "Prakasam",
        "Srikakulam",
        "Visakhapatnam",
        "Vizianagaram",
        "West Godavari",
        "YSR Kadapa",
      ],
    },
    {
      state: "Arunachal Pradesh",
      districts: [
        "Tawang",
        "West Kameng",
        "East Kameng",
        "Papum Pare",
        "Kurung Kumey",
        "Kra Daadi",
        "Lower Subansiri",
        "Upper Subansiri",
        "West Siang",
        "East Siang",
        "Siang",
        "Upper Siang",
        "Lower Siang",
        "Lower Dibang Valley",
        "Dibang Valley",
        "Anjaw",
        "Lohit",
        "Namsai",
        "Changlang",
        "Tirap",
        "Longding",
      ],
    },
    {
      state: "Assam",
      districts: [
        "Baksa",
        "Barpeta",
        "Biswanath",
        "Bongaigaon",
        "Cachar",
        "Charaideo",
        "Chirang",
        "Darrang",
        "Dhemaji",
        "Dhubri",
        "Dibrugarh",
        "Goalpara",
        "Golaghat",
        "Hailakandi",
        "Hojai",
        "Jorhat",
        "Kamrup Metropolitan",
        "Kamrup",
        "Karbi Anglong",
        "Karimganj",
        "Kokrajhar",
        "Lakhimpur",
        "Majuli",
        "Morigaon",
        "Nagaon",
        "Nalbari",
        "Dima Hasao",
        "Sivasagar",
        "Sonitpur",
        "South Salmara-Mankachar",
        "Tinsukia",
        "Udalguri",
        "West Karbi Anglong",
      ],
    },
    {
      state: "Bihar",
      districts: [
        "Araria",
        "Arwal",
        "Aurangabad",
        "Banka",
        "Begusarai",
        "Bhagalpur",
        "Bhojpur",
        "Buxar",
        "Darbhanga",
        "East Champaran (Motihari)",
        "Gaya",
        "Gopalganj",
        "Jamui",
        "Jehanabad",
        "Kaimur (Bhabua)",
        "Katihar",
        "Khagaria",
        "Kishanganj",
        "Lakhisarai",
        "Madhepura",
        "Madhubani",
        "Munger (Monghyr)",
        "Muzaffarpur",
        "Nalanda",
        "Nawada",
        "Patna",
        "Purnia (Purnea)",
        "Rohtas",
        "Saharsa",
        "Samastipur",
        "Saran",
        "Sheikhpura",
        "Sheohar",
        "Sitamarhi",
        "Siwan",
        "Supaul",
        "Vaishali",
        "West Champaran",
      ],
    },
    {
      state: "Chandigarh (UT)",
      districts: ["Chandigarh"],
    },
    {
      state: "Chhattisgarh",
      districts: [
        "Balod",
        "Baloda Bazar",
        "Balrampur",
        "Bastar",
        "Bemetara",
        "Bijapur",
        "Bilaspur",
        "Dantewada (South Bastar)",
        "Dhamtari",
        "Durg",
        "Gariyaband",
        "Janjgir-Champa",
        "Jashpur",
        "Kabirdham (Kawardha)",
        "Kanker (North Bastar)",
        "Kondagaon",
        "Korba",
        "Korea (Koriya)",
        "Mahasamund",
        "Mungeli",
        "Narayanpur",
        "Raigarh",
        "Raipur",
        "Rajnandgaon",
        "Sukma",
        "Surajpur  ",
        "Surguja",
      ],
    },
    {
      state: "Dadra and Nagar Haveli (UT)",
      districts: ["Dadra & Nagar Haveli"],
    },
    {
      state: "Daman and Diu (UT)",
      districts: ["Daman", "Diu"],
    },
    {
      state: "Delhi (NCT)",
      districts: [
        "Central Delhi",
        "East Delhi",
        "New Delhi",
        "North Delhi",
        "North East  Delhi",
        "North West  Delhi",
        "Shahdara",
        "South Delhi",
        "South East Delhi",
        "South West  Delhi",
        "West Delhi",
      ],
    },
    {
      state: "Goa",
      districts: ["North Goa", "South Goa"],
    },
    {
      state: "Gujarat",
      districts: [
        "Ahmedabad",
        "Amreli",
        "Anand",
        "Aravalli",
        "Banaskantha (Palanpur)",
        "Bharuch",
        "Bhavnagar",
        "Botad",
        "Chhota Udepur",
        "Dahod",
        "Dangs (Ahwa)",
        "Devbhoomi Dwarka",
        "Gandhinagar",
        "Gir Somnath",
        "Jamnagar",
        "Junagadh",
        "Kachchh",
        "Kheda (Nadiad)",
        "Mahisagar",
        "Mehsana",
        "Morbi",
        "Narmada (Rajpipla)",
        "Navsari",
        "Panchmahal (Godhra)",
        "Patan",
        "Porbandar",
        "Rajkot",
        "Sabarkantha (Himmatnagar)",
        "Surat",
        "Surendranagar",
        "Tapi (Vyara)",
        "Vadodara",
        "Valsad",
      ],
    },
    {
      state: "Haryana",
      districts: [
        "Ambala",
        "Bhiwani",
        "Charkhi Dadri",
        "Faridabad",
        "Fatehabad",
        "Gurgaon",
        "Hisar",
        "Jhajjar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Kurukshetra",
        "Mahendragarh",
        "Mewat",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Rewari",
        "Rohtak",
        "Sirsa",
        "Sonipat",
        "Yamunanagar",
      ],
    },
    {
      state: "Himachal Pradesh",
      districts: [
        "Bilaspur",
        "Chamba",
        "Hamirpur",
        "Kangra",
        "Kinnaur",
        "Kullu",
        "Lahaul &amp; Spiti",
        "Mandi",
        "Shimla",
        "Sirmaur (Sirmour)",
        "Solan",
        "Una",
      ],
    },
    {
      state: "Jammu and Kashmir",
      districts: [
        "Anantnag",
        "Bandipore",
        "Baramulla",
        "Budgam",
        "Doda",
        "Ganderbal",
        "Jammu",
        "Kargil",
        "Kathua",
        "Kishtwar",
        "Kulgam",
        "Kupwara",
        "Leh",
        "Poonch",
        "Pulwama",
        "Rajouri",
        "Ramban",
        "Reasi",
        "Samba",
        "Shopian",
        "Srinagar",
        "Udhampur",
      ],
    },
    {
      state: "Jharkhand",
      districts: [
        "Bokaro",
        "Chatra",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "East Singhbhum",
        "Garhwa",
        "Giridih",
        "Godda",
        "Gumla",
        "Hazaribag",
        "Jamtara",
        "Khunti",
        "Koderma",
        "Latehar",
        "Lohardaga",
        "Pakur",
        "Palamu",
        "Ramgarh",
        "Ranchi",
        "Sahibganj",
        "Seraikela-Kharsawan",
        "Simdega",
        "West Singhbhum",
      ],
    },
    {
      state: "Karnataka",
      districts: [
        "Bagalkot",
        "Ballari (Bellary)",
        "Belagavi (Belgaum)",
        "Bengaluru (Bangalore) Rural",
        "Bengaluru (Bangalore) Urban",
        "Bidar",
        "Chamarajanagar",
        "Chikballapur",
        "Chikkamagaluru (Chikmagalur)",
        "Chitradurga",
        "Dakshina Kannada",
        "Davangere",
        "Dharwad",
        "Gadag",
        "Hassan",
        "Haveri",
        "Kalaburagi (Gulbarga)",
        "Kodagu",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mysuru (Mysore)",
        "Raichur",
        "Ramanagara",
        "Shivamogga (Shimoga)",
        "Tumakuru (Tumkur)",
        "Udupi",
        "Uttara Kannada (Karwar)",
        "Vijayapura (Bijapur)",
        "Yadgir",
      ],
    },
    {
      state: "Kerala",
      districts: [
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad",
      ],
    },
    {
      state: "Lakshadweep (UT)",
      districts: [
        "Agatti",
        "Amini",
        "Androth",
        "Bithra",
        "Chethlath",
        "Kavaratti",
        "Kadmath",
        "Kalpeni",
        "Kilthan",
        "Minicoy",
      ],
    },
    {
      state: "Madhya Pradesh",
      districts: [
        "Agar Malwa",
        "Alirajpur",
        "Anuppur",
        "Ashoknagar",
        "Balaghat",
        "Barwani",
        "Betul",
        "Bhind",
        "Bhopal",
        "Burhanpur",
        "Chhatarpur",
        "Chhindwara",
        "Damoh",
        "Datia",
        "Dewas",
        "Dhar",
        "Dindori",
        "Guna",
        "Gwalior",
        "Harda",
        "Hoshangabad",
        "Indore",
        "Jabalpur",
        "Jhabua",
        "Katni",
        "Khandwa",
        "Khargone",
        "Mandla",
        "Mandsaur",
        "Morena",
        "Narsinghpur",
        "Neemuch",
        "Panna",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rewa",
        "Sagar",
        "Satna",
        "Sehore",
        "Seoni",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Shivpuri",
        "Sidhi",
        "Singrauli",
        "Tikamgarh",
        "Ujjain",
        "Umaria",
        "Vidisha",
      ],
    },
    {
      state: "Maharashtra",
      districts: [
        "Ahmednagar",
        "Akola",
        "Amravati",
        "Aurangabad",
        "Beed",
        "Bhandara",
        "Buldhana",
        "Chandrapur",
        "Dhule",
        "Gadchiroli",
        "Gondia",
        "Hingoli",
        "Jalgaon",
        "Jalna",
        "Kolhapur",
        "Latur",
        "Mumbai City",
        "Mumbai Suburban",
        "Nagpur",
        "Nanded",
        "Nandurbar",
        "Nashik",
        "Osmanabad",
        "Palghar",
        "Parbhani",
        "Pune",
        "Raigad",
        "Ratnagiri",
        "Sangli",
        "Satara",
        "Sindhudurg",
        "Solapur",
        "Thane",
        "Wardha",
        "Washim",
        "Yavatmal",
      ],
    },
    {
      state: "Manipur",
      districts: [
        "Bishnupur",
        "Chandel",
        "Churachandpur",
        "Imphal East",
        "Imphal West",
        "Jiribam",
        "Kakching",
        "Kamjong",
        "Kangpokpi",
        "Noney",
        "Pherzawl",
        "Senapati",
        "Tamenglong",
        "Tengnoupal",
        "Thoubal",
        "Ukhrul",
      ],
    },
    {
      state: "Meghalaya",
      districts: [
        "East Garo Hills",
        "East Jaintia Hills",
        "East Khasi Hills",
        "North Garo Hills",
        "Ri Bhoi",
        "South Garo Hills",
        "South West Garo Hills ",
        "South West Khasi Hills",
        "West Garo Hills",
        "West Jaintia Hills",
        "West Khasi Hills",
      ],
    },
    {
      state: "Mizoram",
      districts: [
        "Aizawl",
        "Champhai",
        "Kolasib",
        "Lawngtlai",
        "Lunglei",
        "Mamit",
        "Saiha",
        "Serchhip",
      ],
    },
    {
      state: "Nagaland",
      districts: [
        "Dimapur",
        "Kiphire",
        "Kohima",
        "Longleng",
        "Mokokchung",
        "Mon",
        "Peren",
        "Phek",
        "Tuensang",
        "Wokha",
        "Zunheboto",
      ],
    },
    {
      state: "Odisha",
      districts: [
        "Angul",
        "Balangir",
        "Balasore",
        "Bargarh",
        "Bhadrak",
        "Boudh",
        "Cuttack",
        "Deogarh",
        "Dhenkanal",
        "Gajapati",
        "Ganjam",
        "Jagatsinghapur",
        "Jajpur",
        "Jharsuguda",
        "Kalahandi",
        "Kandhamal",
        "Kendrapara",
        "Kendujhar (Keonjhar)",
        "Khordha",
        "Koraput",
        "Malkangiri",
        "Mayurbhanj",
        "Nabarangpur",
        "Nayagarh",
        "Nuapada",
        "Puri",
        "Rayagada",
        "Sambalpur",
        "Sonepur",
        "Sundargarh",
      ],
    },
    {
      state: "Puducherry (UT)",
      districts: ["Karaikal", "Mahe", "Pondicherry", "Yanam"],
    },
    {
      state: "Punjab",
      districts: [
        "Amritsar",
        "Barnala",
        "Bathinda",
        "Faridkot",
        "Fatehgarh Sahib",
        "Fazilka",
        "Ferozepur",
        "Gurdaspur",
        "Hoshiarpur",
        "Jalandhar",
        "Kapurthala",
        "Ludhiana",
        "Mansa",
        "Moga",
        "Muktsar",
        "Nawanshahr (Shahid Bhagat Singh Nagar)",
        "Pathankot",
        "Patiala",
        "Rupnagar",
        "Sahibzada Ajit Singh Nagar (Mohali)",
        "Sangrur",
        "Tarn Taran",
      ],
    },
    {
      state: "Rajasthan",
      districts: [
        "Ajmer",
        "Alwar",
        "Banswara",
        "Baran",
        "Barmer",
        "Bharatpur",
        "Bhilwara",
        "Bikaner",
        "Bundi",
        "Chittorgarh",
        "Churu",
        "Dausa",
        "Dholpur",
        "Dungarpur",
        "Hanumangarh",
        "Jaipur",
        "Jaisalmer",
        "Jalore",
        "Jhalawar",
        "Jhunjhunu",
        "Jodhpur",
        "Karauli",
        "Kota",
        "Nagaur",
        "Pali",
        "Pratapgarh",
        "Rajsamand",
        "Sawai Madhopur",
        "Sikar",
        "Sirohi",
        "Sri Ganganagar",
        "Tonk",
        "Udaipur",
      ],
    },
    {
      state: "Sikkim",
      districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    },
    {
      state: "Tamil Nadu",
      districts: [
        "Ariyalur",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kanchipuram",
        "Kanyakumari",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Salem",
        "Sivaganga",
        "Thanjavur",
        "Theni",
        "Thoothukudi (Tuticorin)",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar",
      ],
    },
    {
      state: "Telangana",
      districts: [
        "Adilabad",
        "Bhadradri Kothagudem",
        "Hyderabad",
        "Jagtial",
        "Jangaon",
        "Jayashankar Bhoopalpally",
        "Jogulamba Gadwal",
        "Kamareddy",
        "Karimnagar",
        "Khammam",
        "Komaram Bheem Asifabad",
        "Mahabubabad",
        "Mahabubnagar",
        "Mancherial",
        "Medak",
        "Medchal",
        "Nagarkurnool",
        "Nalgonda",
        "Nirmal",
        "Nizamabad",
        "Peddapalli",
        "Rajanna Sircilla",
        "Rangareddy",
        "Sangareddy",
        "Siddipet",
        "Suryapet",
        "Vikarabad",
        "Wanaparthy",
        "Warangal (Rural)",
        "Warangal (Urban)",
        "Yadadri Bhuvanagiri",
      ],
    },
    {
      state: "Tripura",
      districts: [
        "Dhalai",
        "Gomati",
        "Khowai",
        "North Tripura",
        "Sepahijala",
        "South Tripura",
        "Unakoti",
        "West Tripura",
      ],
    },
    {
      state: "Uttarakhand",
      districts: [
        "Almora",
        "Bageshwar",
        "Chamoli",
        "Champawat",
        "Dehradun",
        "Haridwar",
        "Nainital",
        "Pauri Garhwal",
        "Pithoragarh",
        "Rudraprayag",
        "Tehri Garhwal",
        "Udham Singh Nagar",
        "Uttarkashi",
      ],
    },
    {
      state: "Uttar Pradesh",
      districts: [
        "Agra",
        "Aligarh",
        "Allahabad",
        "Ambedkar Nagar",
        "Amethi (Chatrapati Sahuji Mahraj Nagar)",
        "Amroha (J.P. Nagar)",
        "Auraiya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bhadohi",
        "Bijnor",
        "Budaun",
        "Bulandshahr",
        "Chandauli",
        "Chitrakoot",
        "Deoria",
        "Etah",
        "Etawah",
        "Faizabad",
        "Farrukhabad",
        "Fatehpur",
        "Firozabad",
        "Gautam Buddha Nagar",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hamirpur",
        "Hapur (Panchsheel Nagar)",
        "Hardoi",
        "Hathras",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kanpur Dehat",
        "Kanpur Nagar",
        "Kanshiram Nagar (Kasganj)",
        "Kaushambi",
        "Kushinagar (Padrauna)",
        "Lakhimpur - Kheri",
        "Lalitpur",
        "Lucknow",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Mathura",
        "Mau",
        "Meerut",
        "Mirzapur",
        "Moradabad",
        "Muzaffarnagar",
        "Pilibhit",
        "Pratapgarh",
        "RaeBareli",
        "Rampur",
        "Saharanpur",
        "Sambhal (Bhim Nagar)",
        "Sant Kabir Nagar",
        "Shahjahanpur",
        "Shamali (Prabuddh Nagar)",
        "Shravasti",
        "Siddharth Nagar",
        "Sitapur",
        "Sonbhadra",
        "Sultanpur",
        "Unnao",
        "Varanasi",
      ],
    },
    {
      state: "West Bengal",
      districts: [
        "Alipurduar",
        "Bankura",
        "Birbhum",
        "Burdwan (Bardhaman)",
        "Cooch Behar",
        "Dakshin Dinajpur (South Dinajpur)",
        "Darjeeling",
        "Hooghly",
        "Howrah",
        "Jalpaiguri",
        "Kalimpong",
        "Kolkata",
        "Malda",
        "Murshidabad",
        "Nadia",
        "North 24 Parganas",
        "Paschim Medinipur (West Medinipur)",
        "Purba Medinipur (East Medinipur)",
        "Purulia",
        "South 24 Parganas",
        "Uttar Dinajpur (North Dinajpur)",
      ],
    },
  ];

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
      const url = "http://13.126.14.109:4000/patient/create";
      const response = await axios.post(url, payload);

      if (
        (response && response.status === 200) ||
        response.data.success === true
      ) {
        toast.success("Patient Created Successfully");

        setTimeout(() => {
          navigate("/registered-patients");
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

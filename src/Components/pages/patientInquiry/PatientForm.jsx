import React, { useEffect, useState } from 'react';

import ReactDOM from "react-dom"
import { useForm } from "react-hook-form"

// import { useState } from "react";
// import React from 'react'  


const PatientForm = () => {


  const countries=[  
    {  
       "state":"Andhra Pradesh",
       "districts":[  
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
          "YSR Kadapa"
       ]
    },
    {  
       "state":"Arunachal Pradesh",
       "districts":[  
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
          "Longding"
       ]
    },
    {  
       "state":"Assam",
       "districts":[  
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
          "West Karbi Anglong"
       ]
    },
    {  
       "state":"Bihar",
       "districts":[  
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
          "West Champaran"
       ]
    },
    {  
       "state":"Chandigarh (UT)",
       "districts":[  
          "Chandigarh"
       ]
    },
    {  
       "state":"Chhattisgarh",
       "districts":[  
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
          "Surguja"
       ]
    },
    {  
       "state":"Dadra and Nagar Haveli (UT)",
       "districts":[  
          "Dadra & Nagar Haveli"
       ]
    },
    {  
       "state":"Daman and Diu (UT)",
       "districts":[  
          "Daman",
          "Diu"
       ]
    },
    {  
       "state":"Delhi (NCT)",
       "districts":[  
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
          "West Delhi"
       ]
    },
    {  
       "state":"Goa",
       "districts":[  
          "North Goa",
          "South Goa"
       ]
    },
    {  
       "state":"Gujarat",
       "districts":[  
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
          "Valsad"
       ]
    },
    {  
       "state":"Haryana",
       "districts":[  
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
          "Yamunanagar"
       ]
    },
    {  
       "state":"Himachal Pradesh",
       "districts":[  
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
          "Una"
       ]
    },
    {  
       "state":"Jammu and Kashmir",
       "districts":[  
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
          "Udhampur"
       ]
    },
    {  
       "state":"Jharkhand",
       "districts":[  
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
          "West Singhbhum"
       ]
    },
    {  
       "state":"Karnataka",
       "districts":[  
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
          "Yadgir"
       ]
    },
    {  
       "state":"Kerala",
       "districts":[  
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
          "Wayanad"
       ]
    },
    {  
       "state":"Lakshadweep (UT)",
       "districts":[  
          "Agatti",
          "Amini",
          "Androth",
          "Bithra",
          "Chethlath",
          "Kavaratti",
          "Kadmath",
          "Kalpeni",
          "Kilthan",
          "Minicoy"
       ]
    },
    {  
       "state":"Madhya Pradesh",
       "districts":[  
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
          "Vidisha"
       ]
    },
    {  
       "state":"Maharashtra",
       "districts":[  
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
          "Yavatmal"
       ]
    },
    {  
       "state":"Manipur",
       "districts":[  
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
          "Ukhrul"
       ]
    },
    {  
       "state":"Meghalaya",
       "districts":[  
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
          "West Khasi Hills"
       ]
    },
    {  
       "state":"Mizoram",
       "districts":[  
          "Aizawl",
          "Champhai",
          "Kolasib",
          "Lawngtlai",
          "Lunglei",
          "Mamit",
          "Saiha",
          "Serchhip"
       ]
    },
    {  
       "state":"Nagaland",
       "districts":[  
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
          "Zunheboto"
       ]
    },
    {  
       "state":"Odisha",
       "districts":[  
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
          "Sundargarh"
       ]
    },
    {  
       "state":"Puducherry (UT)",
       "districts":[  
          "Karaikal",
          "Mahe",
          "Pondicherry",
          "Yanam"
       ]
    },
    {  
       "state":"Punjab",
       "districts":[  
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
          "Tarn Taran"
       ]
    },
    {  
       "state":"Rajasthan",
       "districts":[  
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
          "Udaipur"
       ]
    },
    {  
       "state":"Sikkim",
       "districts":[  
          "East Sikkim",
          "North Sikkim",
          "South Sikkim",
          "West Sikkim"
       ]
    },
    {  
       "state":"Tamil Nadu",
       "districts":[  
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
          "Virudhunagar"
       ]
    },
    {  
       "state":"numberangana",
       "districts":[  
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
          "Yadadri Bhuvanagiri"
       ]
    },
    {  
       "state":"Tripura",
       "districts":[  
          "Dhalai",
          "Gomati",
          "Khowai",
          "North Tripura",
          "Sepahijala",
          "South Tripura",
          "Unakoti",
          "West Tripura"
       ]
    },
    {  
       "state":"Uttarakhand",
       "districts":[  
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
          "Uttarkashi"
       ]
    },
    {  
       "state":"Uttar Pradesh",
       "districts":[  
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
          "Varanasi"
       ]
    },
    {  
       "state":"West Bengal",
       "districts":[  
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
          "Uttar Dinajpur (North Dinajpur)"
       ]
    }
 ]

 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
//   } = useForm<Inputs>()

  const onSubmit= (data) =>{ 

   data.state=country
   
   console.log(data)
}
  

  const [country, setCountry] = useState('');


    
  return (
    <div className='mainForm'>
            <form onSubmit={handleSubmit(onSubmit)} className="form-div">
        <h2>Please fill out all information, so that we may better server you.</h2>

        <div className="form-div">
          <span for="full_name">Patient Full Name</span>
          <input type="text" className="form-input"  placeholder="First Name" {...register('full_name',{required:'This field is required'})}/>
          {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div> 


        <div className="form-div">
          <span for="phone_number">Patient Phone Number</span>
          <input type="number" className="form-input" {...register('phone_number',{required:'This field is required'})} placeholder="+1-416-967-1111"/>
               {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div>

        <div className="form-div">
          <span for="aadhar_number">Aadhar Number</span>
          <input type="number" className="form-input" {...register('aadhar_number',{required:'This field is required'})} placeholder="5416-5967-1111"/>
               {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div>

        <div className="form-div">
          <span for="gender">Patient Gender</span>
          <select name="gender" {...register('gender',{required:'This field is required'})} className='form-input'>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
               {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div>


        <div className="form-div">
          <span for="age">Age</span>
          <input type="number" className="form-input" {...register('age',{required:'This field is required'})} placeholder="Age" min="1" max="110" />
               {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div>  

        <div className="form-div">
          <span for="marital-status">Marital Status</span>
          <select name="marital" {...register('marital',{required:'This field is required'})} className='form-input'>
          <option value="Male">marriede</option>
          <option value="Female">single</option>
        </select>
               {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div>

        <div className="form-div">
          <span for="state">State</span>
          <select        
           value={country}
        onChange={(e) => {
          setCountry([e.target.value]);
        }}
       name="state"  className='form-input'>
             {countries.map((item, index) => {
          return (
            <option key={index} value={index}>
              {item.state}
            </option>
          );
        })}
        </select>
   
               {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div>

        <div className="form-div">
          <span for="district">District</span>
          <select {...register('district')}  name="district"  {...register('district',{required:'This field is required'})}  className='form-input'>
        {countries[country] &&
          countries[country].districts.map((item, index) => {
            return <option value={item}>{item}</option>;
          })}
      </select>
               {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div>

        <div className="form-div">
          <span for="Taluka">Taluka</span>
          <input type="text" className="form-input" placeholder="Taluka" {...register('Taluka',{required:'This field is required'})}/>
               {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div>

        <div className="form-div">
          <span for="Pincode">Pincode</span>
          <input type="number" className="form-input" placeholder="Pincode" {...register('Pincode',{required:'This field is required'})}/>
               {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div>

          <div className="form-div">
          <span for="Address">Patient Full Address</span>
          <input type="text" className="form-input" placeholder="Full Address" {...register('Address',{required:'This field is required'})}  />
               {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div> 

        <button className="full-width-btn form-input" type="submit">Next</button>
      </form>
    </div>
  )
}

export default PatientForm
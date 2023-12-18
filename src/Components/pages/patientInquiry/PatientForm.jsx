import React, { useEffect, useState } from 'react';
import { useData } from '../newPatient/DataContext';
import ReactDOM from "react-dom"
import { useForm } from "react-hook-form"

// import { useState } from "react";
// import React from 'react'  


const PatientForm = () => {

   const { updateData } = useData();

const countries={}
 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const onSubmit= (PatientData) =>{ 

   PatientData.state=country

   const newData = { PatientDetails: PatientData };
   updateData(newData);
   
   console.log(PatientData)
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
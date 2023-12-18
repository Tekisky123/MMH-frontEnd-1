import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import { useData } from '../newPatient/DataContext';
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications
import { useNavigate } from 'react-router-dom';

const DiseaseDetails = () => {

  const { updateData } = useData();
  const { data } = useData();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const onSubmit= (DiseaseData) =>{ 
   
    const newData = {...data, DiseaseDetails: DiseaseData };
    updateData(newData);

    console.log("updateData",updateData)
// console.log("CareDetails",data.CareDetails)
// console.log("DiseaseDetails",data.DiseaseDetails)

   console.log(DiseaseData)

}



  return (
    <div> 
    <form onSubmit={handleSubmit(onSubmit)} className="form-div">
    <h2>Disease Details</h2>

    <div className="form-div">
      <span for="full_name">Full Name</span>
      <input type="text" className="form-input"  placeholder="First Name" {...register('full_name',{required:'This field is required'})}/>
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div> 

    <div className="form-div">
      <span for="Diagnose_date">Diagnose Date</span>
      <input type="date" className="form-input" placeholder="Diagnose date" {...register('Diagnose_date',{required:'This field is required'})}  />
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div> 

    <div className="form-div">
      <span for="Diagnose_Dr">Diagnose by Dr</span>
      <input type="text" className="form-input" placeholder="Diagnose date" {...register('Diagnose_Dr',{required:'This field is required'})} />
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div> 

    <div className="form-div">
      <span for="Investigation_1">Investigation Done 1</span>
      <input type="text" className="form-input"  placeholder="Investigation 1" {...register('Investigation_1',{required:'This field is required'})} />
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div>

    <div className="form-div">
      <span for="Investigation_2">Investigation Done 2</span>
      <input type="text" className="form-input"  placeholder="Investigation 2" {...register('Investigation_2',{required:'This field is required'})} />
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div>

    <div className="form-div">
      <span for="Investigation_3">Investigation Done 3</span>
      <input type="text" className="form-input" placeholder="Investigation 3" {...register('Investigation_3',{required:'This field is required'})}/>
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div>

    <div className="form-div">
      <span for="current_hopital">Current Hospital Name</span>
      <input type="text" className="form-input" placeholder="Current Hospital Name" {...register('current_hopital',{required:'This field is required'})} />
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div> 

    <div className="form-div">
          <span for="Address">Address</span>
          <input type="text" className="form-input"  placeholder="Full Address"  {...register('Address',{required:'This field is required'})} />
               {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div>


    <div className="form-div">
      <span for="phone_number">Phone Number </span>
      <input type="number" className="form-input"  placeholder="+1-416-967-1111" {...register('phone_number',{required:'This field is required'})}/>
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div>


    <div className="form-div">
      <span for="current_Treatment">Current Treatment Details</span>
      <textarea className="form-input" placeholder="Current Treatment Details" {...register('current_Treatment',{required:'This field is required'})}></textarea>
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div> 

    <div className="form-div">
      <span for="doctor_advice">Doctor's Advice for further process</span>
      <textarea className="form-input" placeholder="Enter Doctor Advice" {...register('doctor_advice',{required:'This field is required'})}></textarea>
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div>

   

    <button className="full-width-btn form-input" type="submit">Submit</button>
  </form></div>
  )
}

export default DiseaseDetails
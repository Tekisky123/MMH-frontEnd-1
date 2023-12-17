import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import { useData } from '../newPatient/DataContext';

const CareTaker = () => {

  const { updateData } = useData();
  const { data } = useData();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const onSubmit= (careData) =>{ 
   
    const newData = {  ...data,CareDetails: careData };
    updateData(newData);

   console.log(careData)
}
  
  return (
    <div> 
    <form onSubmit={handleSubmit(onSubmit)} className="form-div">
    <h2>CareTaker Details</h2>

  
    <div className="form-div">
          <span for="full_name">Patient Full Name</span>
          <input type="text" className="form-input"  placeholder="First Name" {...register('full_name',{required:'This field is required'})}/>
          {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
        </div>  


    <div className="form-div">
      <span for="phone_number1">Phone Number 1</span>
      <input type="number" className="form-input" placeholder="+1-416-967-1111" {...register('phone_number1',{required:'This field is required'})}/>
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div>

    <div className="form-div">
      <span for="phone_number2">Phone Number 2</span>
      <input type="number" className="form-input"  placeholder="+1-416-967-1111"  {...register('phone_number2',{required:'This field is required'})}/>
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div>

    <div className="form-div">
      <span for="particulars">Particulars</span>
      <textarea className="form-input"  placeholder="Particulars"  {...register('particulars',{required:'This field is required'})}></textarea>
           {errors.full_name && (
          <span className="error-message">{errors.full_name.message}</span>
        )}
    </div>

   

    <button className="full-width-btn form-input" type="submit">Next</button>
  </form></div>
  )
}

export default CareTaker
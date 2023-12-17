import React, { useState } from 'react'
 // accordian 1 code start
import "../../../Assets/Styles/Patientdashboard.css"
import PatientForm from '../patientInquiry/PatientForm';
import CareTaker from '../patientInquiry/CareTaker';
import DiseaseDetails from '../patientInquiry/DiseaseDetails';
import { DataProvider } from './DataContext';


// import "../../../Assets/Styles/NewPatientDetails.css"

const NewPatientDetails = () => {

   // accordian 1 code end
  return (<>
<div className='main-Div'>
  
</div>


    <div style={{margin:"4rem 2rem"}}>
    <DataProvider>
    <div className="acc-kontainer">
        <div>
          <input type="radio" name="acc" id="acc1" defaultChecked />
          <label htmlFor="acc1"><i className="fa-solid fa-user"></i> Patient Details</label>
          <div className="acc-body">
         

            <PatientForm/>
        
          </div>

        </div>
        <div>
          <input type="radio" name="acc" id="acc2" />
          <label htmlFor="acc2"><i className="fa fa-heart"></i> Patient Details</label>
          <div className="acc-body">
         {/*  */}
          </div>
        </div>
        <div>
          <input type="radio" name="acc" id="acc3" />
          <label htmlFor="acc3"><i className="fa fa-music"></i> Care Taker</label>
          <div className="acc-body">
            {/*  */}
            
               
            <CareTaker/>
          
          </div>
        </div>

        <div>
          <input type="radio" name="acc" id="acc4" />
          <label htmlFor="acc4"><i className="fa fa-music"></i> Disease Details</label>
          <div className="acc-body">
            {/*  */}
            <DataProvider>

            <DiseaseDetails/>
            </DataProvider>
          </div>
        </div>
      </div>
      </DataProvider>
    </div>

     </>)
}

export default NewPatientDetails
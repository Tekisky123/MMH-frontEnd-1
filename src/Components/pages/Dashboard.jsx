import React, { useState } from 'react'
import "../../Assets/Styles/dashboard.css"

const Dashboard = () => {

        const [activeTab, setActiveTab] = useState('patientInquiry');
      
        const opentab = (tabname) => {
          setActiveTab(tabname);
        };
  return (
    <div>
        <div className='container'>
      <div className="tab-titles">
        <p className={`tab-links ${activeTab === 'patientInquiry' ? 'active-link' : ''}`} onClick={() => opentab('patientInquiry')}>Patient Inquiry</p>
        <p className={`tab-links ${activeTab === 'experience' ? 'active-link' : ''}`} onClick={() => opentab('experience')}>Experience</p>
        <p className={`tab-links ${activeTab === 'education' ? 'active-link' : ''}`} onClick={() => opentab('education')}>Education</p>
      </div>
      <div className={`tab-contents ${activeTab === 'patientInquiry' ? 'active-tab' : ''}`} id="patientInquiry">
        
      <form className="form-div">
        <h2>Please fill out all information, so that we may better server you.</h2>

        <div className="form-div">
          <label for="full_name">Patient Full Name</label>
          <input type="text" className="form-input" id="full_name" placeholder="First Name" required autofocus autocomplete="on"/>
          <span className="help-block"></span>
        </div> 


        <div className="form-div">
          <label for="phone_number">Patient Phone Number</label>
          <input type="tel" className="form-input" id="phone_number" placeholder="+1-416-967-1111"/>
          <span className="help-block"></span>
        </div>

        <div className="form-div">
          <label for="gender">Patient Gender</label>
          <select id="gender" name="gender" required className='form-input'>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
          <span className="help-block"></span>
        </div>


        <div className="form-div">
          <label for="age">Age</label>
          <input type="number" className="form-input" id="age" placeholder="Age" min="1" max="110" required/>
          <span className="help-block"></span>
        </div>  

        <div className="form-div">
          <label for="state">State</label>
          <select id="state" name="state" required className='form-input'>
          <option value="Male">Male</option>

        </select>
          <span className="help-block"></span>
        </div>

          <div className="form-div">
          <label for="Address">Patient Full Address</label>
          <input type="text" className="form-input" id="Address" placeholder="Address" required  />
          <span className="help-block"></span>
        </div> 

        <button className="full-width-btn" type="submit">Confirm Appointment</button>
      </form>
      </div>

      <div className={`tab-contents ${activeTab === 'experience' ? 'active-tab' : ''}`} id="experience">
        <p>Experience Content</p>
      </div>
      <div className={`tab-contents ${activeTab === 'education' ? 'active-tab' : ''}`} id="education">
        <p>Education Content</p>
      </div>
    </div>
    </div>
  )
}

export default Dashboard

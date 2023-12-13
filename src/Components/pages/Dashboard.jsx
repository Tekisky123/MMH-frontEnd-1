import React, { useState } from 'react'
import "../../Assets/Styles/dashboard.css"
import PatientDetails from './patientInquiry/PatientDetails';

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
        
  <PatientDetails/>
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

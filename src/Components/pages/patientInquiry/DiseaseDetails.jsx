import React from 'react'

const DiseaseDetails = () => {
  return (
    <div> 
    <form className="form-div">
    <h2>Disease Details</h2>

    <div className="form-div">
      <span for="full_name">Full Name</span>
      <input type="text" className="form-input" id="full_name" placeholder="First Name" required autofocus />
      <span className="help-block"></span>
    </div> 

    <div className="form-div">
      <span for="Diagnose_date">Diagnose Date</span>
      <input type="date" className="form-input" id="Diagnose_date" placeholder="Diagnose date" required  />
      <span className="help-block"></span>
    </div> 

    <div className="form-div">
      <span for="Diagnose_Dr">Diagnose by Dr</span>
      <input type="text" className="form-input" id="Diagnose_Dr" placeholder="Diagnose date" required />
      <span className="help-block"></span>
    </div> 

    <div className="form-div">
      <span for="Investigation_1">Investigation Done 1</span>
      <input type="text" className="form-input" id="Investigation_1" placeholder="Investigation 1" required autofocus />
      <span className="help-block"></span>
    </div>

    <div className="form-div">
      <span for="Investigation_2">Investigation Done 2</span>
      <input type="text" className="form-input" id="Investigation_2" placeholder="Investigation 2" required autofocus />
      <span className="help-block"></span>
    </div>

    <div className="form-div">
      <span for="Investigation_3">Investigation Done 3</span>
      <input type="text" className="form-input" id="Investigation_3" placeholder="Investigation 3" required autofocus />
      <span className="help-block"></span>
    </div>

    <div className="form-div">
      <span for="current_hopital">Current Hospital Name</span>
      <input type="text" className="form-input" id="current_hopital" placeholder="Current Hospital Name" required autofocus />
      <span className="help-block"></span>
    </div> 

    <div className="form-div">
          <span for="Address">Address</span>
          <input type="text" className="form-input" id="Address" placeholder="Full Address" required  />
          <span className="help-block"></span>
        </div>


    <div className="form-div">
      <span for="phone_number">Phone Number </span>
      <input type="tel" className="form-input" id="phone_number" placeholder="+1-416-967-1111"/>
      <span className="help-block"></span>
    </div>


    <div className="form-div">
      <span for="current_Treatment">Current Treatment Details</span>
      <textarea className="form-input" id="current_Treatment" placeholder="Current Treatment Details"></textarea>
      <span className="help-block"></span>
    </div> 

    <div className="form-div">
      <span for="doctor_advice">Doctor's Advice for further process</span>
      <textarea className="form-input" id="doctor_advice" placeholder="Enter Doctor Advice"></textarea>
      <span className="help-block"></span>
    </div>

   

    <button className="full-width-btn form-input" type="submit">Submit</button>
  </form></div>
  )
}

export default DiseaseDetails
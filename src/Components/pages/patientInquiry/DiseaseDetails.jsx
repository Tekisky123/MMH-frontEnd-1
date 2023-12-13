import React from 'react'

const DiseaseDetails = () => {
  return (
    <div> 
    <form className="form-div">
    <h2>Disease Details</h2>

    <div className="form-div">
      <label for="full_name">Full Name</label>
      <input type="text" className="form-input" id="full_name" placeholder="First Name" required autofocus />
      <span className="help-block"></span>
    </div> 

    <div className="form-div">
      <label for="Diagnose_date">Diagnose Date</label>
      <input type="date" className="form-input" id="Diagnose_date" placeholder="Diagnose date" required  />
      <span className="help-block"></span>
    </div> 

    <div className="form-div">
      <label for="Diagnose_Dr">Diagnose by Dr</label>
      <input type="text" className="form-input" id="Diagnose_Dr" placeholder="Diagnose date" required />
      <span className="help-block"></span>
    </div> 

    <div className="form-div">
      <label for="Investigation_1">Investigation Done 1</label>
      <input type="text" className="form-input" id="Investigation_1" placeholder="Investigation 1" required autofocus />
      <span className="help-block"></span>
    </div>

    <div className="form-div">
      <label for="Investigation_2">Investigation Done 2</label>
      <input type="text" className="form-input" id="Investigation_2" placeholder="Investigation 2" required autofocus />
      <span className="help-block"></span>
    </div>

    <div className="form-div">
      <label for="Investigation_3">Investigation Done 3</label>
      <input type="text" className="form-input" id="Investigation_3" placeholder="Investigation 3" required autofocus />
      <span className="help-block"></span>
    </div>

    <div className="form-div">
      <label for="current_hopital">Current Hospital Name</label>
      <input type="text" className="form-input" id="current_hopital" placeholder="Current Hospital Name" required autofocus />
      <span className="help-block"></span>
    </div> 

    <div className="form-div">
          <label for="Address">Address</label>
          <input type="text" className="form-input" id="Address" placeholder="Full Address" required  />
          <span className="help-block"></span>
        </div>


    <div className="form-div">
      <label for="phone_number">Phone Number </label>
      <input type="tel" className="form-input" id="phone_number" placeholder="+1-416-967-1111"/>
      <span className="help-block"></span>
    </div>


    <div className="form-div">
      <label for="current_Treatment">Current Treatment Details</label>
      <textarea className="form-input" id="current_Treatment" placeholder="Current Treatment Details"></textarea>
      <span className="help-block"></span>
    </div> 

    <div className="form-div">
      <label for="doctor_advice">Doctor's Advice for further process</label>
      <textarea className="form-input" id="doctor_advice" placeholder="Enter Doctor Advice"></textarea>
      <span className="help-block"></span>
    </div>

   

    <button className="full-width-btn form-input" type="submit">Submit</button>
  </form></div>
  )
}

export default DiseaseDetails
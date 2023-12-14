import React from 'react'

const CareTaker = () => {
  return (
    <div> 
    <form className="form-div">
    <h2>CareTaker Details</h2>

    <div className="form-div">
      <span for="full_name">Full Name</span>
      <input type="text" className="form-input" id="full_name" placeholder="First Name" required autofocus autocomplete="on"/>
      <span className="help-block"></span>
    </div> 


    <div className="form-div">
      <span for="phone_number1">Phone Number 1</span>
      <input type="number" className="form-input" id="phone_number1" placeholder="+1-416-967-1111"/>
      <span className="help-block"></span>
    </div>

    <div className="form-div">
      <span for="phone_number2">Phone Number 2</span>
      <input type="number" className="form-input" id="phone_number2" placeholder="+1-416-967-1111"/>
      <span className="help-block"></span>
    </div>

    <div className="form-div">
      <span for="particulars">Particulars</span>
      {/* <input type="text" className="form-input" id="particulars" placeholder="Particulars "/> */}
      <textarea className="form-input" id="particulars" placeholder="Particulars"></textarea>
      <span className="help-block"></span>
    </div>

   

    <button className="full-width-btn form-input" type="submit">Next</button>
  </form></div>
  )
}

export default CareTaker
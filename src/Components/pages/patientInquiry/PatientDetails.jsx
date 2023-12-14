import React, { useState } from 'react';
import PatientForm from './PatientForm'
import "../../../Assets/Styles/PatientDetails.css"
import CareTaker from './CareTaker';
import DiseaseDetails from './DiseaseDetails';

const PatientDetails = () => {

    // const [activeItem, setActiveItem] = useState(null);
  
    // const toggleAccordionItem = (itemKey) => {
    //   setActiveItem(activeItem === itemKey ? null : itemKey);
    // };


{/* start tabs Code */}
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
    };
{/* End tabs Code */}


  return (

    <div>

{/* <section class="accordion">
  <div class="tab">
    <input type="radio" name="accordion-1" id="cb1" checked/>
    <label for="cb1" class="tab__label">Checkbox</label>
    <div class="tab__content">
      <p>Pure CSS accordion based on the "input:checked + label" style trick.</p>
    </div>
  </div>
  <div class="tab">
    <input type="radio" name="accordion-1" id="cb2"/>
    <label for="cb2" class="tab__label">Open multiple</label>
    <div class="tab__content">
      <p>Using <code>&lt;input type="checkbox"&gt;</code> allows having several tabs open at the same time.</p>
    </div>
  </div>
</section>

<section class="accordion accordion--radio">
  <div class="tab">
    <input type="radio" name="accordion-2" id="rd1" checked/>
    <label for="rd1" class="tab__label">Radio</label>
    <div class="tab__content">
      <p>If you want to have only one tab open, you can use <code>&lt;input type="checkbox"&gt;</code>.</p>
    </div>
  </div>
  <div class="tab">
    <input type="radio" name="accordion-2" id="rd2"/>
    <label for="rd2" class="tab__label">Open single</label>
    <div class="tab__content">
      <p>But if you wanna close the opened tab, you must add a "close" button somewhere, like the one below, that is just another styled radio input.</p>
    </div>
  </div>
  <div class="tab">
    <input type="radio" name="accordion-2" id="rd3"/>
    <label for="rd3" class="tab__close">Close open tab &times;</label>
  </div>
</section> */}
{/* start tabs Code */}

      <header className="header">
        <h1 className='heading1'>Patient Inquiry</h1>
        <div className="tabs">
          <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>
          Patient Details
          </button>
          <button onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active' : ''}>
          Patient Family Details
          </button>
          <button onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active' : ''}>
            Care Taker
          </button>
          <button onClick={() => handleTabClick(4)} className={activeTab === 4 ? 'active' : ''}>
            Disease Details
          </button>
        </div>
      </header>

      <main className="main">
        {activeTab === 1 && <PatientForm/>}
        {activeTab === 2 && <p>Content of Tab Two</p>}
        {activeTab === 3 && <CareTaker/>}
        {activeTab === 4 && <DiseaseDetails/>}
      </main>
{/* End tabs Code */}
    </div>
  )
}

export default PatientDetails
import React from "react";
import "../../Assets/Styles/Home.css";
import { Link } from "react-router-dom";
import profile from "../../Assets/Images/profile.png"
import profile2 from "../../Assets/Images/profile2.png"
import profile3 from "../../Assets/Images/profile3.png"
import profile4 from "../../Assets/Images/profile4.png"
// import image1 from "../../Assets/Images/image-1.jpg"
import image2 from "../../Assets/Images/image-2.jpg"
// import image3 from "../../Assets/Images/image-3.jpg"
import image4 from "../../Assets/Images/image-4.jpg"
import image5 from "../../Assets/Images/image-5.jpg"

const Home = () => {
  return (
    <div>
      {/* Header */}
      <div className="container-fluid main-banner">
        {/* text content */}
        <div className="text-content">
          <h6>Welcome To MMH</h6>
          <h4>Muslim Medical Help</h4>
          <p>
            a compassionate non-profit organization based in Nanded,
            Maharashtra, dedicated to making quality healthcare accessible and
            affordable for all. At MMH, we believe in the power of health to
            transform lives and communities.
          </p>
          <Link className="service-btn">OUR SERVICES</Link>
        </div>
        {/* text-content end */}
      </div>
      {/* Header-end */}
      {/* request section */}
      <div className="container-fluid request-form">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h4>Request a call right now ?</h4>
              <span>
                Facilitating affordable hospital admissions for various medical
                needs.
              </span>
            </div>
            <div className="col-md-4">
              <Link className="request-btn">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
      {/* request section end */}

      {/* services */}
      <div className="container services">
        <div className="row">
          <div className="col-md-12">
            <div className="services-heading">
              <h2>
                <em>Services</em>
              </h2>
              <span>services provided by Muslim Medical Help (MMH)</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="service-item">
              <img
                src={image5}
                alt="Service 1"
              />
              <div className="down-content">
                <h4> Medical Consultations</h4>
                <p>
                  Connect with experienced healthcare professionals for expert
                  advice and guidance. Telemedicine services for remote
                  consultations, ensuring accessibility for all.
                </p>
                <Link className="filled-button">Read More</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-item">
              <img
                src={image2}
                alt="Service 2"
              />
              <div className="down-content">
                <h4> Hospital Assistance</h4>
                <p>
                  Facilitate affordable hospital admissions for various medical
                  conditions. Collaborate with renowned hospitals to provide
                  quality healthcare services.
                </p>
                <Link className="filled-button">Read More</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-item">
              <img
                src={image4}
                alt="Service 3"
              />
              <div className="down-content">
                <h4>Financial Assistance Programs</h4>
                <p>
                  Create programs to offer financial aid for medical treatments
                  to those facing economic hardships,financial institutions to
                  provide low-interest medical loans.
                </p>
                <Link className="filled-button">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* services end */}

      {/* work-section */}
      <div className="container-fluid work-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="left-content">
                <h2>
                  At <em> Muslim Medical Help (MMH),</em>
                </h2>
                <p>
                  MMH envisions a society where health services are equally
                  accessible to all, regardless of socio-economic status. We
                  strive to eliminate disparities in healthcare, ensuring that
                  every individual has the right to quality medical care.
                  <br />
                  <br />
                  To work towards creating a healthcare system that prioritizes
                  inclusivity, affordability, and accessibility, breaking down
                  barriers that prevent individuals from receiving the
                  healthcare they need.
                </p>
                <Link className="filled-button">Read More</Link>
              </div>
            </div>

            <div className="col-md-6">
              <div className="right-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="count-content">
                      <h4>Affordable Medical Consultations</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="count-content">
                      <h4> Hospital Assistance and Admissions</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="count-content">
                      <h4>Medication Support and Accessibility</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="count-content">
                      <h4>Global Health Initiatives</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Detail */}
      <div className="more-detail">
        <div className="container">
          <div className="more-info-content">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={image5}
                  alt="More Info"
                />
              </div>
              <div className="col-md-6">
                <div className="right-content">
                  <span>Who we are</span>
                  <h2>
                    Muslim Medical Help <em>(MMH)</em>
                  </h2>
                  <p>
                    a compassionate non-profit organization headquartered in
                    Nanded, Maharashtra, dedicated to transforming lives through
                    accessible and affordable healthcare
                    <br />
                    <br />
                    At MMH, our mission is to ensure that every individual,
                    regardless of their socio-economic background, has the right
                    to quality healthcare. We strive to break down barriers to
                    access by providing a comprehensive range of healthcare
                    services and support.
                  </p>
                  <Link className="filled-button">Read More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="testimonials">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>
                  <em>About Us</em>
                </h2>
                <span>Our Team</span>
              </div>
            </div>

            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="testimonial-item">
                    <div className="testimonail-content">
                      <h4>Advocate Talha</h4>
                      <span>Chief Financial Analyst</span>
                      <p>
                        Committed to community service, Advocate Talha brings
                        valuable experience to MMH, contributing to our mission
                        of accessible healthcare for all.
                      </p>
                    </div>
                    <div className="img">
                      <img
                        src={profile4}
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="testimonial-item">
                    <div className="testimonail-content">
                      <h4>Mohammad Siddiqui</h4>
                      <span>Chief Financial Analyst</span>
                      <p>
                        Committed to community well-being, Mohammad Siddiqui is
                        a valued presence at MMH, contributing to our vision of
                        accessible healthcare.
                      </p>
                    </div>
                    <div className="img">
                      <img
                        src={profile3}
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="testimonial-item">
                    <div className="testimonail-content">
                      <h4>Mufti Habibur Raheem</h4>
                      <span>Chief Financial Analyst</span>
                      <p>
                        A dynamic team member contributing to MMH's global
                        engagement, Mufti Habibur Raheem enriches our impact
                        beyond local communities.
                      </p>
                    </div>
                    <div className="img">
                      <img
                        src={profile2}
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="testimonial-item">
                    <div className="testimonail-content">
                      <h4>Mr Jamal</h4>
                      <span>Chief Financial Analyst</span>
                      <p>
                        A global-minded team contributor, Mr Jamal expands MMH's
                        reach beyond borders, making a positive difference on a
                        broader scale.
                      </p>
                    </div>
                    <div className="img">
                      <img
                        src={profile}
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="callback-form">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>
                Need Assistance? <em>Connect With Us</em>
                </h2>
                <span>If you need assistance or have any questions, don't hesitate to Connect With Us</span>
              </div>
            </div>

            <div className="col-md-12">
              <div className="contact-form">
                <form id="contact" action="" method="post">
                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          type="name"
                          name="text"
                          placeholder="Full Name"
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          type="email"
                          name="text"
                          placeholder="E-Mail Address"
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          type="subject"
                          name="number"
                          placeholder="Mobile Number"
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <textarea
                          name="message"
                          rows="6"
                          className="form-control"
                          id="message"
                          placeholder="Your Message"
                          required=""
                        ></textarea>
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="border-button"
                        >
                          Send Message
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import {
  MdHealthAndSafety,
  MdLocalHospital,
  MdVolunteerActivism,
  MdPhone,
  MdEmail,
  MdGroups,
  MdVerified,
  MdAccessTime,
} from "react-icons/md";
import image2 from "../../Assets/Images/image-2.jpg";
import image4 from "../../Assets/Images/image-4.jpg";
import image5 from "../../Assets/Images/image-5.jpg";
import profile from "../../Assets/Images/profile.png";
import profile2 from "../../Assets/Images/profile2.png";
import profile3 from "../../Assets/Images/profile3.png";
import profile4 from "../../Assets/Images/profile4.png";
import "../../Assets/Styles/Home.css";

const SERVICES = [
  {
    img: image5,
    icon: <MdHealthAndSafety />,
    title: "Medical Consultations",
    desc: "Connect with experienced healthcare professionals for expert advice. Telemedicine services ensure accessibility for everyone, everywhere.",
  },
  {
    img: image2,
    icon: <MdLocalHospital />,
    title: "Hospital Assistance",
    desc: "Facilitating affordable hospital admissions for all medical conditions. We collaborate with renowned hospitals to provide quality care.",
  },
  {
    img: image4,
    icon: <MdVolunteerActivism />,
    title: "Financial Assistance",
    desc: "Programs offering financial aid for medical treatments for those facing economic hardships, including low-interest medical loan facilitation.",
  },
];

const STATS = [
  { value: "5000+", label: "Patients Served" },
  { value: "50+", label: "Partner Hospitals" },
  { value: "10+", label: "Years of Service" },
  { value: "100%", label: "Non-Profit" },
];

const TEAM = [
  { name: "Advocate Talha", role: "Co-Founder & Chief Analyst", img: profile4, desc: "Committed to community service, Advocate Talha brings valuable legal and financial experience to MMH's mission of accessible healthcare." },
  { name: "Mohammad Siddiqui", role: "Co-Founder & Operations Head", img: profile3, desc: "Mohammad Siddiqui drives MMH's operational excellence, contributing to a vision of inclusive, accessible healthcare for all." },
  { name: "Mufti Habibur Raheem", role: "Community Relations Lead", img: profile2, desc: "Enriching MMH's impact beyond local communities, Mufti Habibur Raheem leads global outreach and community engagement." },
  { name: "Mr. Jamal", role: "Global Initiatives Director", img: profile, desc: "A global-minded contributor, Mr. Jamal expands MMH's reach beyond borders, making a positive difference at scale." },
];

const WHY_US = [
  { icon: <MdGroups />, title: "Community First", desc: "Every decision is driven by the well-being of the communities we serve." },
  { icon: <MdVerified />, title: "Trusted Network", desc: "Partnered with verified hospitals and healthcare professionals." },
  { icon: <MdAccessTime />, title: "Always Available", desc: "Round-the-clock support for medical queries and emergencies." },
];

const Home = () => {
  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">Welcome to MMH</span>
          <h1 className="hero-title">Maharashtra Medical Help</h1>
          <p className="hero-desc">
            A compassionate non-profit organization based in Nanded, Maharashtra,
            dedicated to making quality healthcare accessible and affordable for all.
          </p>
          <div className="hero-actions">
            <Link to="/addPatient" className="hero-btn hero-btn--primary">
              Register a Patient
            </Link>
            <Link to="/yojna" className="hero-btn hero-btn--outline">
              Our Schemes
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="stats-section">
        <div className="home-container">
          <div className="stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="stat-card">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section services-section">
        <div className="home-container">
          <div className="section-header">
            <span className="section-eyebrow">What We Do</span>
            <h2 className="section-title">Our <em>Services</em></h2>
            <p className="section-subtitle">Services provided by Maharashtra Medical Help (MMH)</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="service-card">
                <div className="service-card-img">
                  <img src={s.img} alt={s.title} />
                  <span className="service-card-icon">{s.icon}</span>
                </div>
                <div className="service-card-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to="/yojna" className="card-link">Learn More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="section about-section">
        <div className="home-container">
          <div className="about-grid">
            <div className="about-img-wrap">
              <img src={image5} alt="About MMH" className="about-img" />
              <div className="about-img-badge">
                <span className="badge-num">10+</span>
                <span className="badge-txt">Years Serving</span>
              </div>
            </div>
            <div className="about-content">
              <span className="section-eyebrow">Who We Are</span>
              <h2 className="section-title">Maharashtra Medical Help <em>(MMH)</em></h2>
              <p>
                A compassionate non-profit organization headquartered in Nanded, Maharashtra,
                dedicated to transforming lives through accessible and affordable healthcare.
              </p>
              <p>
                Our mission is to ensure that every individual, regardless of their
                socio-economic background, has the right to quality healthcare. We strive
                to break down barriers to access by providing a comprehensive range of
                healthcare services and support.
              </p>
              <div className="about-actions">
                <Link to="/addPatient" className="hero-btn hero-btn--primary">Register a Patient</Link>
                <Link to="/yojna" className="hero-btn hero-btn--ghost">View Schemes</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section why-section">
        <div className="home-container">
          <div className="section-header">
            <span className="section-eyebrow">Why Us</span>
            <h2 className="section-title">Our <em>Commitment</em></h2>
          </div>
          <div className="why-grid">
            {WHY_US.map((w) => (
              <div key={w.title} className="why-card">
                <span className="why-icon">{w.icon}</span>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="section team-section">
        <div className="home-container">
          <div className="section-header">
            <span className="section-eyebrow">About Us</span>
            <h2 className="section-title">Meet Our <em>Team</em></h2>
          </div>
          <div className="team-grid">
            {TEAM.map((m) => (
              <div key={m.name} className="team-card">
                <img src={m.img} alt={m.name} className="team-avatar" />
                <div className="team-info">
                  <h4>{m.name}</h4>
                  <span className="team-role">{m.role}</span>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="section contact-section">
        <div className="home-container">
          <div className="section-header">
            <span className="section-eyebrow">Reach Out</span>
            <h2 className="section-title">Need Assistance? <em>Connect With Us</em></h2>
            <p className="section-subtitle">If you need help or have any questions, don't hesitate to reach out.</p>
          </div>
          <div className="contact-grid">
            {/* Contact info */}
            <div className="contact-info">
              <div className="contact-info-item">
                <span className="contact-info-icon"><MdPhone /></span>
                <div>
                  <strong>Phone</strong>
                  <p>9923472806 &nbsp;|&nbsp; 9011304885</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon"><MdEmail /></span>
                <div>
                  <strong>Email</strong>
                  <p>contact@mmh.org</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon"><MdLocalHospital /></span>
                <div>
                  <strong>Location</strong>
                  <p>Nanded, Maharashtra, India</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <input type="text" placeholder="Full Name" className="form-input" />
                <input type="email" placeholder="Email Address" className="form-input" />
              </div>
              <input type="tel" placeholder="Mobile Number" className="form-input" />
              <textarea placeholder="Your Message" rows={5} className="form-input form-textarea" />
              <button type="submit" className="hero-btn hero-btn--primary form-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="cta-section">
        <div className="home-container">
          <h2>Ready to make a difference?</h2>
          <p>Join MMH in bringing healthcare to those who need it most.</p>
          <Link to="/addPatient" className="hero-btn hero-btn--white">
            Register a Patient Today
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;

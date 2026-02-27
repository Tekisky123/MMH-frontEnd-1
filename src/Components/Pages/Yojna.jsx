import React, { useState, useEffect } from "react";
import "../../Assets/Styles/Yojna.css";
import { MdClose, MdHealthAndSafety, MdSearch, MdArrowForward, MdStar } from "react-icons/md";

const SCHEMES = [
  {
    id: 1,
    tag: "Central Govt.",
    title: "Ayushman Bharat",
    imageUrl: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2019/06/ayushman-bharat-t2-1549021906-1561226597.jpg",
    benefit: "₹5 Lakh cover per family per year",
    details: "This scheme came into existence because of recommendations made by the National Health Policy. Ayushman Bharat Yojana is designed keeping in mind Universal Health Coverage (UHC). Health services in India are largely segmented and Ayushman Bharat aims to make them comprehensive. It is about looking at the health sector as a whole and ensure continuous care for the people of India.",
  },
  {
    id: 2,
    tag: "State Govt.",
    title: "Mahatma Jyotiba Phule Jan Arogya Yojana",
    imageUrl: "https://www.freshersnow.com/wp-content/uploads/2021/12/Mahatma-Jyotiba-Phule-Jan-Arogya-Yojana.png",
    benefit: "₹1.5 Lakh hospitalization cover",
    details: "121 follow-up packages, and 971 procedures. A beneficiary family will receive Rs.1.5 lakh hospitalization cover if any family member undergoes medical treatment in a hospital listed under this scheme.",
  },
  {
    id: 3,
    tag: "Central Govt.",
    title: "Pradhan Mantri Suraksha Bima Yojana",
    imageUrl: "https://www.ccbjhalawar.com/images/pmsby-details.jpg",
    benefit: "₹2 Lakh accident insurance cover",
    details: "Pradhan Mantri Suraksha Bima Yojana aims to provide accident insurance cover to the people of India. People in the age group of 18–70 years with a bank account can avail this scheme. It provides an annual cover of Rs 2 lakh for total disability and death, and Rs 1 lakh for partial disability.",
  },
  {
    id: 4,
    tag: "Central Govt.",
    title: "Pradhan Mantri Surakshit Matritva Abhiyan",
    imageUrl: "https://www.impactguru.com/info/wp-content/uploads/2023/04/Pradhan-Mantri-Surakshit-Matritva-Abhiyan-PMSMA-1200-x-800.jpg",
    benefit: "Free antenatal care for all pregnant women",
    details: "Launched by the Ministry of Health & Family Welfare, Government of India. The program aims to provide assured, comprehensive and quality antenatal care, free of cost, universally to all pregnant women on the 9th of every month.",
  },
  {
    id: 5,
    tag: "Central Govt.",
    title: "National Health Mission (NHM)",
    imageUrl: "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/national-rural-health-mission.jpg",
    benefit: "Accessible rural & urban healthcare",
    details: "A flagship initiative of the Government of India aimed at providing accessible, affordable, and quality healthcare to the rural population. Launched in 2013, it integrates the National Rural Health Mission (NRHM) and the National Urban Health Mission (NUHM).",
  },
  {
    id: 6,
    tag: "Central Govt.",
    title: "Rashtriya Swasthya Bima Yojana (RSBY)",
    imageUrl: "https://images.ctfassets.net/uwf0n1j71a7j/IwDMa2FgKqTtHdH5Hs2be/7a208529af4db38c77bd214f76ee0936/rsby-rashtriya-swasthya-bima-yojana.png",
    benefit: "Smart card for cashless treatment",
    details: "A health insurance scheme for below-poverty-line (BPL) families. Beneficiaries receive a smart card that can be used in empaneled hospitals for cashless treatment.",
  },
  {
    id: 7,
    tag: "Central Govt.",
    title: "Pradhan Mantri Swasthya Suraksha Yojana",
    imageUrl: "https://ehealth.eletsonline.com/wp-content/uploads/2021/03/pm-yojna.png",
    benefit: "Affordable tertiary healthcare access",
    details: "Focused on correcting the imbalances in the availability of affordable and reliable tertiary healthcare services. It aimed to augment facilities for quality medical education in the country.",
  },
  {
    id: 8,
    tag: "Central Govt.",
    title: "National Mental Health Program",
    imageUrl: "https://bizgossips.in/uploads/images/202303/image_870x_641ed8e649397.jpg",
    benefit: "Free mental health services access",
    details: "Focuses on promoting mental health, preventing mental illnesses, and ensuring access to mental health services for all citizens regardless of economic background.",
  },
  {
    id: 9,
    tag: "Central Govt.",
    title: "Janani Suraksha Yojana (JSY)",
    imageUrl: "https://cdn.zeebiz.com/hindi/sites/default/files/styles/zeebiz_850x478/public/2022/06/05/88065-jsy.jpg",
    benefit: "Cash assistance for institutional delivery",
    details: "A safe motherhood intervention under the National Rural Health Mission (NRHM). It provides cash assistance to pregnant women for institutional delivery.",
  },
  {
    id: 10,
    tag: "Central Govt.",
    title: "National Tuberculosis Elimination Program",
    imageUrl: "https://mma.prnewswire.com/media/1319045/NTEP.jpg?p=facebook",
    benefit: "Free TB detection & treatment",
    details: "Focused on eradicating tuberculosis (TB) in India through various strategies, including early detection, treatment, and public awareness campaigns.",
  },
  {
    id: 11,
    tag: "Central Govt.",
    title: "National AIDS Control Program (NACP)",
    imageUrl: "https://papertyari.com/wp-content/uploads/2020/03/National-AIDS-Control-Programme.png",
    benefit: "Free HIV/AIDS treatment & support",
    details: "A comprehensive program to prevent and control the spread of HIV/AIDS in the country. It includes prevention, care, support, and treatment initiatives for all affected individuals.",
  },
];

const Yojna = () => {
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const results = SCHEMES.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="yjna-root">

      {/* ─── Hero Banner ─── */}
      <section className="yjna-banner">
        <div className="yjna-banner-content">
          <div className="yjna-banner-pill">
            <MdHealthAndSafety className="yjna-banner-pill-icon" />
            Government Healthcare Schemes
          </div>
          <h1 className="yjna-banner-heading">Yojna Details</h1>
          <p className="yjna-banner-sub">
            Explore Central &amp; State government healthcare schemes available to
            every citizen of Maharashtra and India.
          </p>
          {/* Search */}
          <div className="yjna-search-box">
            <MdSearch className="yjna-search-icon" />
            <input
              type="text"
              className="yjna-search-input"
              placeholder="Search schemes…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        {/* decorative wave */}
        <div className="yjna-banner-wave" />
      </section>

      {/* ─── Cards ─── */}
      <main className="yjna-main">
        <p className="yjna-count">
          Showing <strong>{results.length}</strong> of {SCHEMES.length} schemes
        </p>

        {results.length === 0 ? (
          <div className="yjna-no-results">
            <MdSearch size={40} />
            <p>No schemes match "<em>{query}</em>"</p>
          </div>
        ) : (
          <div className="yjna-grid">
            {results.map((s) => (
              <article
                key={s.id}
                className="yjna-card"
                onClick={() => setActive(s)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${s.title}`}
                onKeyDown={(e) => e.key === "Enter" && setActive(s)}
              >
                <div className="yjna-card-thumb">
                  <img src={s.imageUrl} alt={s.title} className="yjna-card-img" />
                  <span className={`yjna-card-badge ${s.tag === "State Govt." ? "yjna-card-badge--state" : ""}`}>
                    {s.tag}
                  </span>
                </div>
                <div className="yjna-card-content">
                  <h3 className="yjna-card-name">{s.title}</h3>
                  <p className="yjna-card-benefit">
                    <MdStar className="yjna-benefit-star" />
                    {s.benefit}
                  </p>
                  <div className="yjna-card-footer">
                    <span className="yjna-card-cta">
                      View Details <MdArrowForward />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* ─── Modal Backdrop ─── */}
      {active && (
        <div
          className="yjna-modal-bg"
          onClick={() => setActive(null)}
          role="presentation"
        >
          <div
            className="yjna-modal-box"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            {/* Modal Top Bar */}
            <div className="yjna-modal-topbar">
              <span className={`yjna-modal-badge ${active.tag === "State Govt." ? "yjna-modal-badge--state" : ""}`}>
                {active.tag}
              </span>
              <button
                className="yjna-modal-x"
                onClick={() => setActive(null)}
                aria-label="Close modal"
              >
                <MdClose />
              </button>
            </div>

            {/* Modal Image */}
            <div className="yjna-modal-img-wrap">
              <img src={active.imageUrl} alt={active.title} className="yjna-modal-img" />
            </div>

            {/* Modal Body */}
            <div className="yjna-modal-body">
              <h2 className="yjna-modal-name">{active.title}</h2>

              <div className="yjna-modal-highlight">
                <span className="yjna-modal-highlight-label">Key Benefit</span>
                <p className="yjna-modal-highlight-val">
                  <MdStar className="yjna-benefit-star" />
                  {active.benefit}
                </p>
              </div>

              <hr className="yjna-modal-rule" />

              <h4 className="yjna-modal-section-head">About This Scheme</h4>
              <p className="yjna-modal-description">{active.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Yojna;

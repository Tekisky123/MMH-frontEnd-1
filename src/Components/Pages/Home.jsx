import React from "react";
import '../../Assets/Styles/Home.css'

const Home = () => {
  return (
    <>
      <main className="HomeMain">

        <section className="HomeSectionFirst"> 
          <h1>Muslim Medical Help</h1>
          <p>For The Help Of Patient In Service To Nation</p>
        </section>

        <section className="HomeSectionSecond">
          
        <h3>Our Motive</h3>
          <p>
            The motive is to provide you best Advice and Assistance about Health
            Schemes(Yojna) and save your money and time.
          </p>

          <h3>Government Aim</h3>
          <p>
            Every government has a responsibility towards its citizens to
            provide affordable and accessible healthcare to whoever requires it.
            And to make this possible, governments launch many different health
            services(Yojna) so that the common citizen can use these
            facilities when they need it the most. Similarly, the Indian
            government has also launched a variety of health schemes
            that have low cost and offer a significant sum insured in the
            hope to make good healthcare available to all.
          </p>
          
          <h3>WHAT IS A GOVERNMENT HEALTH SCHEME?</h3>
          <p>
            A government health scheme is a health scheme
            sponsored by a state or the central government. The aim of such
            schemes is to offer affordable health Treatment to the common man
            and improve healthcare facilities in different strata of society.
          </p>

        </section>

        <section className="HomeSectionThird">
          <h3>We are providing guidance about many schemes like:</h3>

          <ul>
            <li>Mahatma Jyotiba Phule Jan Arogya Yojana (MJPJAY).</li>
            <li>Ayushman Bharat Yojana-Pradhan Mantri Jan Arogya Yojana. </li>
            <li>
              Maharashtra Chief Minister Relief Fund For Medical Assistance.
            </li>
            <li>Trustee Hospital For EWS/BPL Category.</li>
            <li>G.M.C Medical Facility</li>
            <li>Labour Medical Claim Scheme.</li>
            <li>Rashtriya Bal Swasthya Karyakram</li>
          </ul>
        </section>

      </main>

      <footer>
        <p>
          Address: Shop No:2 Babu Seth Complex Opp.Talha Lodge,RailWay Station
          Road Nanded-431601 (M.S)
        </p>
      </footer>

    </>
  );
};

export default Home;

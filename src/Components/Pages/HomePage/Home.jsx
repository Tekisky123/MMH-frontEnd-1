import React from "react";
// import '../../Assets/Styles/Home.css'
import '../../../Assets/Styles/Home.css'
import { HomePageData } from "./HomePageData";

const Home = () => {
  const [first,second,third,fourth]=HomePageData
  return (

    <>
      <main className="HomeMain">

        <section className="HomeSectionFirst"> 
          <h1>{first.mainTitle}</h1>
          <p>{first.description}</p>
        </section>

        <section className="HomeSectionSecond">
          
        <h3>{second.ourMotiveTitle}</h3>
          <p>{second.ourMotiveData}</p>

          <h3>{second.governmentAimTitle}</h3>
          <p>
            {second.governmentAimData}
          </p>
          
          <h3>{second.governmentSchemeTitle}</h3>
          <p>
            {second.governmentSchemeDescription}
          </p>

        </section>

        <section className="HomeSectionThird">
          <h3>{third.schemesProvidedTitle}</h3>

          <ul>
            <li>{third["schemesProvidedData"][0]}</li>
            <li>{third["schemesProvidedData"][1]} </li>
            <li>
            {third["schemesProvidedData"][2]}
            </li>
            <li>{third["schemesProvidedData"][3]}</li>
            <li>{third["schemesProvidedData"][4]}</li>
            <li>{third["schemesProvidedData"][5]}</li>
            <li>{third["schemesProvidedData"][6]}</li>
          </ul>
        </section>

      </main>

      <footer>
        <p>
          {fourth.address}
        </p>
      </footer>

    </>
  );
};

export default Home;

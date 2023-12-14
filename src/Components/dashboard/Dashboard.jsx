import { useState } from "react";
import "../../Assets/Styles/Dashboard.css";
// import Home from "../pages";
import CreateUser from "../pages/CreateUser";
// import RegisterPatient from "../pages/RegisterPatient";

const Dashboard = () => {


  const [activeTab, setActiveTab] = useState("home");

  const opentab = (tabname) => {
    setActiveTab(tabname);
  };
  return (
    <div>
   
    </div>
  );
};

export default Dashboard;

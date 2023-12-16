import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Components/Registration/Login";
import Signup from "./Components/Registration/Signup";
import Dashboard from "./Components/dashboard/Dashboard";
import Header from "./Components/Header";
import Home from "./Components/pages/Home";
import RegisteredPatients from "./Components/pages/RegisteredPatients";
import PageNotFound from "./Components/pages/PageNotFound";
import User from "./Components/pages/User";
import CreateUser from "./Components/pages/CreateUser";
import "./App.css";

// import PatientDetails from './Components/pages/patientInquiry/PatientDetails';
import NewPatientDetails from "./Components/pages/newPatient/NewPatientDetails";
import AddPatientDetails from "./Components/pages/newPatient/AddPatientDetails";
function App() {
  const location = useLocation();

  const currentRoute = location.pathname;

  console.log(location);
  console.log(currentRoute);

  const routesToHideHeader = ["/", "/signup", "*"]; // Add the routes where you want to hide the header

  return (
    <div className="App">
      {!routesToHideHeader.includes(currentRoute) && <Header />}
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/user" element={<User />} />
        <Route path="/registered-patients" element={<RegisteredPatients />} />
        {/* <Route path="/signup" element={<Signup/>} /> */}
        {/* <Route path="/home" element={<Home/>} /> */}
        {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        {/* <Route path="/register" element={<RegisteredPatients/>} /> */}
        {/* <Route path="/addPatient" element={<PatientDetails/>} /> */}
        {/* <Route path="/addPatient" element={<NewPatientDetails />} /> */}
        <Route path="/addPatient" element={<AddPatientDetails />} />
      </Routes>
    </div>
  );
}

export default App;

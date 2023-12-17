import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Components/Registration/Login";
import Signup from "./Components/Registration/Signup";
import Dashboard from "./Components/dashboard/Dashboard";
import Header from "./Components/Header";
import Home from "./Components/Pages/Home";
import RegisteredPatients from "./Components/Pages/RegisteredPatients";
import PageNotFound from "./Components/Pages/PageNotFound";
import User from "./Components/Pages/User";
import CreateUser from "./Components/Pages/CreateUser";
import "./App.css";

// import PatientDetails from './Components/pages/patientInquiry/PatientDetails';
import NewPatientDetails from "./Components/Pages/newPatient/NewPatientDetails";
import Yojna from "./Components/Pages/Yojna";
import EditUser from "./Components/Pages/EditUser";
function App() {
  const location = useLocation();

  const currentRoute = location.pathname;

  // console.log(location);
  // console.log(currentRoute);

  const routesToHideHeader = ["/", "/signup", "*"]; // Add the routes where you want to hide the header

  return (
    <div className="App">
      {!routesToHideHeader.includes(currentRoute) && <Header />}
      
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/yojna" element={<Yojna />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/user" element={<User />} />
        <Route path="/registered-patients" element={<RegisteredPatients />} />
        <Route path="/addPatient" element={<NewPatientDetails />} />
        <Route path="/edituser" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;

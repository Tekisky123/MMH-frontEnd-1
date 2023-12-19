// Import necessary dependencies from React and third-party libraries
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
// import NewPatientDetails from "./Components/pages/newPatient/NewPatientDetails";
import Yojna from "./Components/Pages/Yojna";
import EditUser from "./Components/Pages/EditUser";
import OperatorHeader from "./Components/Registration/OperatorHeader";
import AddPatientDetails from "./Components/Pages/newPatient/AddPatientDetails";
import Loader from "./common/Loader";
import ProtectedRout from "./ProtectedRout";

function App() {
  // Get the current location using the useLocation hook
  const location = useLocation();
  const currentRoute = location.pathname;

  // Function to set the user type in local storage
  const handleSetUserType = (userType) => {
    console.log("User Type in App.js:", userType);
    localStorage.setItem("userType", userType);
  };

  // Define routes where the header should be hidden
  const routesToHideHeader = ["/", "/createuser" , <EditUser />];

  // Retrieve the stored user type from local storage
  const storedUserType = localStorage.getItem("userType");

  // Log the stored user type if available
  if (storedUserType) {
    console.log("User Type retrieved from local storage:", storedUserType);
    // Perform any additional actions with the stored user type if needed
  }

  // JSX rendering for the App component
  return (
    <div className="App">
      <Loader>
      {/* Display the header based on the current route and user type */}
      {!routesToHideHeader.includes(currentRoute) &&
        (storedUserType === "Operator" ? <OperatorHeader /> : <Header />)}

      {/* Define routes for the application */}
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Login setUserType={handleSetUserType} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<ProtectedRout Component={Home} />} />
        <Route path="/yojna" element={<ProtectedRout Component={Yojna} />} />
        <Route path="/createuser" element={<ProtectedRout Component={CreateUser} />} />
        <Route path="/createuser/:editId" element={<ProtectedRout Component={CreateUser} />} />
        <Route path="/registered-patients" element={<ProtectedRout Component={RegisteredPatients} />} />
      {(storedUserType === "Operator" ? "": (<>
        <Route path="/user" element={<ProtectedRout Component={User} />} />
        <Route path="/dashboard" element={<ProtectedRout Component={Dashboard} />} />
      </>) 
      )}
       


        <Route path="/edituser/:_id" element={<ProtectedRout Component={EditUser} />} />
        {/* <Route path="/signup" element={<Signup/>} /> */}
        {/* <Route path="/home" element={<Home/>} /> */}
        {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        {/* <Route path="/register" element={<RegisteredPatients/>} /> */}
        {/* <Route path="/addPatient" element={<PatientDetails/>} /> */}
        {/* <Route path="/addPatient" element={<NewPatientDetails />} /> */}
        <Route path="/addPatient" element={<ProtectedRout Component={AddPatientDetails} />} />
      </Routes>
      </Loader>
    </div>
  );
}

// Export the App component as the default export
export default App;

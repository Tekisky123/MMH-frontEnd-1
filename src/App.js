// Import necessary dependencies from React and third-party libraries
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
// import NewPatientDetails from "./Components/pages/newPatient/NewPatientDetails";
import Yojna from "./Components/pages/Yojna";
import EditUser from "./Components/pages/EditUser";
import OperatorHeader from "./Components/Registration/OperatorHeader";
import AddPatientDetails from "./Components/pages/newPatient/AddPatientDetails";
import Loader from "./common/Loader";
import Protected from "./Protected";
import NetworkHospitals from "./Components/pages/NetworkHospitals";
import OperatorDashboard from "./Components/dashboard/OperatorDashboard";
import Reports from "./Components/pages/Reports";
import OpRegisteredPatients from "./Components/pages/OpRegisteredPatients";


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
 const routesToHideHeader = ["/", "/createuser", "/edituser/:_id"];


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
        <Route path="/" element={<Login setUserType={handleSetUserType} />} />
        <Route path="/home" element={<Protected><Home/></Protected>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/yojna" element={<Protected><Yojna /></Protected>} />
        <Route path="/createuser" element={<Protected><CreateUser/></Protected>} />
        <Route path="/createuser/:editId" element={<Protected><CreateUser/></Protected>} />
        <Route path="/opRegistered-patients" element={<Protected><OpRegisteredPatients/></Protected>} />
        <Route path="/opRegistered-patients/:cardStatus" element={<Protected><OpRegisteredPatients/></Protected>} />
        <Route path="/networkHospitals" element={<Protected><NetworkHospitals /></Protected>} />
        <Route path="/dashboard/:number" element={<Protected><OperatorDashboard /></Protected>} />


      {(storedUserType === "Operator" ? "": (<>
        <Route path="/registered-patients" element={<Protected><RegisteredPatients/></Protected>} />
        <Route path="/registered-patients/:cardStatus" element={<Protected><RegisteredPatients/></Protected>} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/reports" element={<Protected><Reports /></Protected>} />
        <Route path="/user" element={<Protected><User /></Protected>} />
      </>) 
      )}

       
        <Route path="/edituser/:_id" element={<Protected><EditUser/></Protected>} />
        {/* <Route path="/signup" element={<Signup/>} /> */}
        {/* <Route path="/home" element={<Home/>} /> */}
        {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        {/* <Route path="/register" element={<RegisteredPatients/>} /> */}
        {/* <Route path="/addPatient" element={<PatientDetails/>} /> */}
        {/* <Route path="/addPatient" element={<NewPatientDetails />} /> */}
        <Route path="/addPatient" element={<Protected><AddPatientDetails /></Protected>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Loader>
    </div>
  );
}

// Export the App component as the default export
export default App;

import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Components/Registration/Login";
import Signup from "./Components/Registration/Signup";
import Dashboard from "./Components/Pages/Dashboard";
import Header from "./Components/Header";
import Home from "./Components/Pages/Home";
import RegisteredPatients from "./Components/Pages/RegisteredPatients";
import PageNotFound from "./Components/Pages/PageNotFound";
import User from "./Components/Pages/User";
import CreateUser from "./Components/Pages/CreateUser";
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
        <Route path="/createuser" element={<CreateUser/>} />
        <Route path="/user" element={<User />} />
        <Route path="/registered-patients" element={<RegisteredPatients />} />
      </Routes>
    </div>
  );
}

export default App;

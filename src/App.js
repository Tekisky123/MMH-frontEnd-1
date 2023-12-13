import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Components/Registration/Login';
import Signup from "./Components/Registration/Signup"
import Dashboard from "./Components/dashboard/Dashboard"
// import Dashboard from './Components/Pages/Dashboard';
import Header from './Components/Header';
import Home from './Components/Pages/Home';
import RegisteredPatients from './Components/Pages/RegisteredPatients';
function App() {
  const location = useLocation()


  const currentRoute = location.pathname

  console.log(location);
  console.log(currentRoute);
  return (
    <div className="App">
       {
        currentRoute !== "/" &&  currentRoute !== "/signup" ?  <Header/> : <></>
      }
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/register" element={<RegisteredPatients/>} />
      </Routes>
    </div>
  );
}


export default App;

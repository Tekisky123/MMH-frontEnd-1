import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Registration/Login';
import Signup from "./Components/Registration/Signup"
function App() {
  return (
    <div className="App">
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
       
      </Routes>
    </div>
  );
}


export default App;

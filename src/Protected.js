import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const location = useLocation();
    const navigate =useNavigate()
    var isAuth = localStorage.getItem('accessToken')
    
  return isAuth ? (<>{ children }</>) :  (
    <>
  <Navigate to="/" replace state={{ path: location.pathname }} />
    </>
  )
}

export default Protected
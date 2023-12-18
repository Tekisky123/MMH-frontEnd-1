// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Login from './Components/Registration/Login';

const ProtectedRoute = ({ element, isAuthenticated, redirectTo = '/login', ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to={<Login/>} />}
    />
  );
};

export default ProtectedRoute;

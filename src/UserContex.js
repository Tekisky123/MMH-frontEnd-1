// UserContext.js
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) => {
    setUserType(userData.userType);
    setMobileNumber(userData.mobile);
    setAccessToken(userData.token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserType("");
    setMobileNumber("");
    setAccessToken("");
    setIsLoggedIn(false);
  };

  const value = {
    userType,
    mobileNumber,
    accessToken,
    isLoggedIn,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

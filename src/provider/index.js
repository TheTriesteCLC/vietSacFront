import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [userID, setUserID_] = useState(localStorage.getItem("userID"))

  // Function to set the authentication token
  const setToken = (newToken) => {
    if(!newToken) {
      localStorage.removeItem('token');
    }else {
      setToken_(newToken);
    }
  };

  const setUserID = (newUserID) => {
    if(!newUserID) {
      localStorage.removeItem('userID');
    }else {
      setUserID_(newUserID);
    }
    
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
      localStorage.setItem('userID',userID);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
    }
  }, [token, userID]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userID,
      setUserID,
    }),
    [token, userID]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
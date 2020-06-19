import React, { useState } from "react";
import LoadingIndicator from "../components/UI/LoadingIndicator";

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
});

//funct component return AuthContext.Provider
const AuthContextProvider = (props) => {
  //check whether user is authenticated
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const loginHandler = () => {
    setisAuthenticated(true);
  };
  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

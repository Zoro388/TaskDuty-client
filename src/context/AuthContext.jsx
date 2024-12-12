import { createContext, useState } from "react";
// import axios from "axios";
import axiosInstance from "../utilis/axiosInstance";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem("token")) || null;
  });

  const signInUser = async (formdata, props) => {
    // send request to server with form data
    try {
      const { data } = await axiosInstance.post("/api/auth/signin", formdata);
      console.log(data);

      setToken(data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
      props.onHide();
    } catch (error) {
      console.log(error);
    }
  };

  const signUpUser = async (formdata, props) => {
    try {
      const { data } = await axiosInstance.post("/api/auth/register", formdata);
      console.log(data);

      setToken(data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
      props.onHide();
    } catch (error) {
      console.log(error);
    }
  };
  const contextData = {
    name: "David",
    token,
    signInUser,
    signUpUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

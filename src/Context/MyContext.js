import React, { createContext, useState, useContext, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [darkThemeMode, setDarkThemeMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const theme = useTheme();
  const MobileScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const MediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDarkThemeMode(
        localStorage.getItem("darkMode") === "true" ? true : false
      );
    }
  }, []);

  let token;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);
  return (
    <MyContext.Provider
      value={{
        darkThemeMode,
        setDarkThemeMode,
        isLoading,
        setIsLoading,
        MobileScreen,
        MediumScreen,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  return useContext(MyContext);
};

export { MyContextProvider, useMyContext };

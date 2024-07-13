import React, { createContext, useState, useContext, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [darkThemeMode, setDarkThemeMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
  return (
    <MyContext.Provider
      value={{
        darkThemeMode,
        setDarkThemeMode,
        isLoading,
        setIsLoading,
        MobileScreen,
        MediumScreen,
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

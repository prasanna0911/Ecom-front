import React, { createContext, useState, useContext, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ApiServices } from "../api/api";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [darkThemeMode, setDarkThemeMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  const getCartItems = () => {
    ApiServices.GetCartItems().then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setCartItems(res.cart_items);
      }
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const getWishlistItems = () => {
    ApiServices.GetFavouriteItems().then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setWishListItems(res.wishlist);
      }
    });
  };

  useEffect(() => {
    getWishlistItems();
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
        isLogin,
        setIsLogin,
        getCartItems,
        cartItems,
        setCartItems,
        wishListItems,
        setWishListItems,
        getWishlistItems,
        searchQuery,
        setSearchQuery,
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

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../routes/Home";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ManageAccount from "../components/Account/ManageAccount/ManageAccount";
import MyAccount from "../components/Account/MyAccount/MyAccount";
import Shop from "../components/Shop/Shop";
import ItemView from "../routes/ItemView";
import CategoryView from "../routes/CategoryView";
import SearchView from "../routes/Search";
import Login from "../components/Authentication/Login/Login";
import Register from "../components/Authentication/Register/Register";
import Wishlist from "../components/Wishlist";
import "@radix-ui/themes/styles.css";
import MyOrders from "../components/Account/MyOrders";
import ShippingAddress from "../components/Account/ShippingAddress";
import MyReviews from "../components/Account/MyReviews";
import { MyContextProvider } from "../Context/MyContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import lightTheme from "../Themes/lightTheme";
import darkTheme from "../Themes/darkTheme";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartItems } from "../routes/CartItems";
import Checkout from "../routes/Checkout";
import Order from "../routes/Order";
import PaymentSuccess from "../components/Checkout/PaymentSuccess";
import PaymentFailure from "../components/Checkout/PaymentFailure";
import RatingsAndReviews from "../routes/RatingsAndReviews";
import AllReviews from "../routes/AllReviews";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "../components/Authentication/ForgetPassword/ForgetPassword";
import ResetPassword from "../components/Authentication/ResetPassword/ResetPassword";

function App() {
  const [darkThemeMode, setDarkThemeMode] = useState(false);

  // const toggleDarkMode = () => {
  //   const newMode = !darkThemeMode;
  //   localStorage.setItem("darkMode", JSON.stringify(newMode));
  //   setDarkThemeMode(newMode);
  // };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      // delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  // const handleRightClick = (event) => {
  //   // event.preventDefault();
  //   alert("Right-click is disabled on this element.");
  // };

  return (
    <MyContextProvider>
      <ThemeProvider theme={darkThemeMode ? darkTheme : lightTheme}>
        <CssBaseline />
        {/* <div onContextMenu={handleRightClick}> */}
        <Router>
          <Header />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            // autoClose={false}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            // rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="light"
          />
          {/* <Switch checked={darkThemeMode} onChange={toggleDarkMode} /> */}
          <Routes>
            <Route index element={<Home />} />
            <Route path="/account">
              <Route path="me" element={<MyAccount />} />
              <Route path="me/myaccount" element={<ManageAccount />} />
              <Route path="me/myorders" element={<MyOrders />} />
              <Route path="me/manageaddress" element={<ShippingAddress />} />
              <Route path="me/myreviews" element={<MyReviews />} />
              <Route path="me/payments" element={<MyOrders />} />
              {/* <Route path="manage" element={<ManageAccount />} /> */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </Route>
            <Route path="/auth/forget-password" element={<ForgetPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/shop" element={<Shop />} />

            <Route path="/category">
              <Route path=":id" element={<CategoryView />} />
            </Route>
            <Route path="/item">
              <Route path="/item/men">
                <Route path=":id" element={<ItemView />} />
              </Route>
              <Route path="/item/women">
                <Route path=":id" element={<ItemView />} />
              </Route>
              <Route path="/item/kids">
                <Route path=":id" element={<ItemView />} />
              </Route>
              <Route path="/item/featured">
                <Route path=":id" element={<ItemView />} />
              </Route>
            </Route>
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search/*" element={<SearchView />} />
            <Route path="/cartitems" element={<CartItems />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route
              path="/checkout/paymentsuccess"
              element={<PaymentSuccess />}
            />
            <Route
              path="/checkout/paymentfailure"
              element={<PaymentFailure />}
            />
            <Route path="/order/:id" element={<Order />} />
            <Route
              path="/ratingsandreviews/:id"
              element={<RatingsAndReviews />}
            />
            <Route path="/allreviews/:id" element={<AllReviews />} />
          </Routes>
          <Footer />
          <Routes>
            <Route path="/admin" element={<Wishlist />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </MyContextProvider>
  );
}

export default App;

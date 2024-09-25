import axios from "axios";

// const baseUrl = "http://localhost:5000";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { Authorization: "Bearer " + token },
});

const form = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "multipart/form-data", // Set content type for file upload
    Authorization: "Bearer " + token,
  },
});

console.log("baseUrl", process.env.API_BASE_URL);
console.log("REACT_APP_API_BASE_URL:", process.env.REACT_APP_API_BASE_URL);

//product api

const GetAllProducts = async (data) => {
  try {
    const response = await axios.get(baseUrl + `/api/getallitems`);
    return response.data;
  } catch (error) {
    return error;
  }
};

//user api's

const signup = async (data) => {
  try {
    const response = await axios.post(baseUrl + "/signup", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const Login = async (data) => {
  try {
    const response = await axios.post(baseUrl + "/login", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const RecoverPassword = async (data) => {
  try {
    const response = await axios.post(baseUrl + "/recover-password", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const OtpVerification = async (data) => {
  try {
    const response = await axios.post(baseUrl + "/verify-otp", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const UserData = async () => {
  try {
    const response = await instance.get(baseUrl + "/getuserdata");
    return response.data;
  } catch (error) {
    return error;
  }
};

const UpdateName = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/updatename", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const UpdateUserName = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/updateusername", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const UpdateEmail = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/updateuseremail", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const UpdateMobileNumber = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/addmobilenumber", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const UpdatePassword = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/updatepassword", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const AddShippingAddress = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/addaddress", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const EditShippingAddress = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/editaddress", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const DeleteShippingAddress = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/deleteaddress", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const SetPrimaryAddress = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/setprimary", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const RemovePrimaryAddress = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/removeprimary", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const AddToCart = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/addtocart", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const GetCartItems = async () => {
  try {
    const response = await instance.get(baseUrl + "/getcartitems");
    return response.data;
  } catch (error) {
    return error;
  }
};

const RemoveFromCart = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/removefromcart", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const AddToFavourites = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/addtofavourites", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const GetFavouriteItems = async () => {
  try {
    const response = await instance.get(baseUrl + "/getfavouriteitems");
    return response.data;
  } catch (error) {
    return error;
  }
};

const RemoveFromFavourites = async (data) => {
  try {
    const response = await instance.post(
      baseUrl + "/removefromfavourites",
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const IncreaseCartItemCount = async (data) => {
  try {
    const response = await instance.post(
      baseUrl + "/increasecartitemcount",
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const DecreaseCartItemCount = async (data) => {
  try {
    const response = await instance.post(
      baseUrl + "/decreasecartitemcount",
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

//order api

const PostOrder = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/postorder", data);
    return response.data;
  } catch (error) {
    return error;
  }
};
const GetMyOrders = async (data) => {
  try {
    const response = await instance.get(baseUrl + "/getmyorders", data);
    return response.data;
  } catch (error) {
    return error;
  }
};
const CancellMyOrder = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/cencelmyorders", data);
    return response.data;
  } catch (error) {
    return error;
  }
};
const GetOrderHistory = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/getorderhistory", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

//pay check

const PayCheck = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/paycheck", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

//Reviews

const GetMyReviews = async () => {
  try {
    const response = await instance.get(baseUrl + "/getmyreviews");
    return response.data;
  } catch (error) {
    return error;
  }
};

const AddRating = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/addrating", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const AddReview = async (data) => {
  try {
    const response = await form.post(baseUrl + "/addreview", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const AddReviewLike = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/addreviewlike", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const AddReviewDisLike = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/addreviewdislike", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const GetProductReviews = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/getproductreviews", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const ApiServices = {
  signup,
  Login,
  RecoverPassword,
  OtpVerification,
  UserData,
  UpdateName,
  UpdateUserName,
  UpdateEmail,
  UpdateMobileNumber,
  UpdatePassword,
  GetAllProducts,
  AddShippingAddress,
  EditShippingAddress,
  DeleteShippingAddress,
  SetPrimaryAddress,
  RemovePrimaryAddress,
  AddToCart,
  GetCartItems,
  RemoveFromCart,
  IncreaseCartItemCount,
  DecreaseCartItemCount,
  AddToFavourites,
  GetFavouriteItems,
  RemoveFromFavourites,
  PostOrder,
  GetMyOrders,
  CancellMyOrder,
  GetOrderHistory,
  PayCheck,
  GetMyReviews,
  AddRating,
  AddReview,
  AddReviewLike,
  AddReviewDisLike,
  GetProductReviews,
};

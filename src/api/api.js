import axios from "axios";

const baseUrl = "http://localhost:5000";
// const baseUrl = process.env.API_BASE_URL;
console.log("baseUrl", baseUrl);

let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { Authorization: "Bearer " + token },
});

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
export const ApiServices = {
  signup,
  Login,
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
};

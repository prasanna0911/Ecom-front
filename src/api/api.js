import axios from "axios";

const baseUrl = "http://localhost:8000";
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

export const ApiServices = {
  signup,
  Login,
  UserData,
  UpdateName,
  UpdateUserName,
  UpdateEmail,
  UpdateMobileNumber,
  UpdatePassword,
};

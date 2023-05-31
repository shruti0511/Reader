import axios from "axios";

const API_URL = "http://localhost:3500/";

// const verifyUser = (code) => {
//     return axios.get(API_URL + "auth/confirm/" + code).then((response) => {
//       return response.data;
//     });
// };

// const verifyUser = (data) => {
//   debugger
//   return axios.post(API_URL + "auth/confirm",data).then((response) => {
//     return response.data;
//   });
// };
const verifyUser = async(data) => {
  return await axios.post(API_URL + "auth/confirm",data)
};

const reSendEmail = async(data) => {
  return await axios.post(API_URL + "auth/reSendEmail",data)
};

const forgotPassword = async(data) => {
  return await axios.post(API_URL + "auth/forgotPasword",data)
};

const resetPassword = async(data) => {
  return await axios.post(API_URL + "auth/resetPasword",data)
};

export default {
  verifyUser,
  reSendEmail,
  forgotPassword,
  resetPassword
  };

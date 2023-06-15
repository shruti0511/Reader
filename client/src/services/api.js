import axios from 'axios';
import { store } from 'redux/store';
import jwtDecode from 'jwt-decode';
import { setCredentials } from 'redux/authSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  withCredentials: true
});
//   });
const refreshToken = async () => {
  try {
    const res = await axios.get(process.env.REACT_APP_SERVER_API+"/auth/refresh",{withCredentials:true});
    const { accessToken } = res.data
    store.dispatch(setCredentials({ accessToken }))
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

api.interceptors.request.use(
  async (config)=> {
  const user = store.getState().auth
  let currentDate = new Date();
    const decodedToken = jwtDecode(user.token);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      config.headers["authorization"] = "Bearer " + data.accessToken;
    }
    else {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
      return config;
  });
export default api;


// const instance = axios.create({
//     baseURL: "base_url",
//   });

//   instance.interceptors.request.use(function (config) {
//     const token = store.getState()?.user?.userData?.token;
//       config.headers.Authorization = token;
//       return config;
//   });
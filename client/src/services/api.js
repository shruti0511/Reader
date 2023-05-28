import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from 'redux/authSlice';
import { store } from 'redux/store';

const api = axios.create({
  baseURL:  process.env.REACT_APP_SERVER_API,
});

// const token = useSelector(selectCurrentToken)
// api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// Modify the above line based on how you store your token (localStorage, Redux store, etc.)
// const instance = axios.create({
//     baseURL: "base_url",
//   });

api.interceptors.request.use(function (config) {
    const token = store.getState().auth.token
      config.headers.Authorization = `Bearer ${token}`;
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
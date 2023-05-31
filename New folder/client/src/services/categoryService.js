import api from "./api";

const categoryService = {
  getCategories: async() => {
      return await api.get('/category');
    },

    addCategory: async(data) => {
      return await api.post(`/category`,data);
    },
    updateCategory: async(data) => {
        return await api.patch(`/category`,data);
    },
    deleteCategory: async(data) => {
        return await api.delete(`/category`,{ data: data });
      },

  };

  export default categoryService;



// import axios from "axios";

// const API_URL = process.env.REACT_APP_SERVER_API;

// const getCategories = async(data) => {
//   return await axios.get(API_URL + "/category")
// };

// const addCategory = async(data) => {
//     return await axios.post(API_URL + "/category",data)
//   };

// const updateCategory = async(data) => {
//   return await axios.patch(API_URL + "/category",data)
// };

// const deleteCategory = async(data) => {
//   return await axios.delete(API_URL + "/category",{ data: data })
// };

// export default {
//     getCategories,
//     addCategory,
//     updateCategory,
//     deleteCategory
//   };

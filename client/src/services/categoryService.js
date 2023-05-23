import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_API;

const getCategories = async(data) => {
  return await axios.get(API_URL + "/category")
};

const addCategory = async(data) => {
    return await axios.post(API_URL + "/category",data)
  };

const updateCategory = async(data) => {
  return await axios.patch(API_URL + "/category",data)
};

const deleteCategory = async(data) => {
  return await axios.delete(API_URL + "/category",{ data: data })
};

export default {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
  };

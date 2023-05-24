import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_API;

const getAllBooks = async () => {
    return await axios.get(API_URL + "/book")
};

const addBook = async (data) => {
    return await axios.post(API_URL + "/book", data)
};

const updateBook = async (data) => {
    return await axios.patch(API_URL + "/book", data)
};
const deleteBook = async (data) => {
    return await axios.delete(API_URL + "/book", { data: data })
};


export default {
    addBook,
    getAllBooks,
    updateBook,
    deleteBook
};
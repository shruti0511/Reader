import axios from "axios";

const API_URL = "http://localhost:3500/";

const addBooks = async(data) => {
    return await axios.post(API_URL + "book",data)
};


export default {
    addBooks
    };
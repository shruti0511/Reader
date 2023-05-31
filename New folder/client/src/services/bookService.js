import api from "./api";

const bookService = {
    getAllBooks: async() => {
      return await api.get('/book');
    },
  getBookById: async (id) => {
      return await api.get(`/book/${id}`)
    },
    addBook: async(data) => {
      return await api.post(`/book`,data);
    },
    updateBook: async(data) => {
        return await api.patch(`/book`,data);
    },
    deleteBook: async(data) => {
        return await api.delete(`/book`,{ data: data });
      },

  };

  export default bookService;
// const getAllBooks = async () => {
//     return await api.get("/book")
// };

// const addBook = async (data) => {
//     return await api.post("/book", data)
// };

// const updateBook = async (data) => {
//     return await api.patch("/book", data)
// };
// const deleteBook = async (data) => {
//     return await api.delete("/book", { data: data })
// };


// export default {
//     addBook,
//     getAllBooks,
//     updateBook,
//     deleteBook
// };

import api from "./api";

const authorService = {
  getAuthors: async () => {
    return await api.get('/author');
  },

  addAuthor: async (data) => {
    return await api.post(`/author`, data);
  },
  updateAuthor: async (data) => {
    return await api.patch(`/author`, data);
  },
  deleteAuthor: async (data) => {
    return await api.delete(`/author`, { data: data });
  },
  importExcel: async (data) => {
    return await api.post(`/author/importExcel`, data);
  },
  getAuthorsWithBooks: async () => {
    return await api.get('/author/author-books');
  },

};

export default authorService;

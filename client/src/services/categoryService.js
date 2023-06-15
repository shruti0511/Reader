import api from "./api";

const categoryService = {
  getCategories: async () => {
    return await api.get('/category');
  },

  addCategory: async (data) => {
    return await api.post(`/category`, data);
  },
  updateCategory: async (data) => {
    return await api.patch(`/category`, data);
  },
  deleteCategory: async (data) => {
    return await api.delete(`/category`, { data: data });
  },
  getCategorieswithBooks: async () => {
    return await api.get('/category/category-books');
  },
};

export default categoryService;

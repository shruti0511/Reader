import api from "./api";

const libraryService = {
    addToLibrary: async(data) => {
      return await api.post(`/library`,data);
    },
    getUserLibrary: async() => {
        return await api.get(`/library`);
  },
  removeFromLibrary: async(data) => {
    return await api.delete(`/library`,{ data: data });
  }
  };

  export default libraryService;
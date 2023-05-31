import api from "./api";

const libraryService = {
    addToLibrary: async(data) => {
      return await api.post(`/library`,data);
    },
    getUserLibrary: async() => {
        return await api.get(`/library`);
      }
  };

  export default libraryService;
import api from "./api";

const ratingService = {

    addRating: async(data) => {
      return await api.post(`/rating`,data);
  },
  updateRating: async(data) => {
    return await api.patch(`/rating`,data);
  },
  deleteRating: async(data) => {
    return await api.delete(`/rating`,{ data: data });
  },


  };

  export default ratingService;
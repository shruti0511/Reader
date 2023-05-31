import api from "./api";

const ratingService = {

    addRating: async(data) => {
      return await api.post(`/rating`,data);
    },


  };

  export default ratingService;
import api from "./api";

const languageService = {
    getLanguages: async () => {
        return await api.get('/language');
    },

    addLanguage: async (data) => {
        return await api.post(`/language`, data);
    },
    updateLanguage: async (data) => {
        return await api.patch(`/language`, data);
    },
    deleteLanguage: async (data) => {
        return await api.delete(`/language`, { data: data });
    },
    importExcel: async (data) => {
        return await api.post(`/language/importExcel`, data);
    },

};

export default languageService;

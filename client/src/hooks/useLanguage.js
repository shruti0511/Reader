import { useEffect, useState } from "react";
import languageService from "services/languageService";

const useLanguages = () => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        // if (!query) return;

        const fetchData = async () => {
            setStatus('fetching');
            const response = await languageService.getLanguages()
            const data = await response.data
            setData(data);
            setStatus('fetched');
        };

        fetchData();
    }, []);

    return { status, data };
};

export default useLanguages

import { useEffect, useState } from "react";

const { default: authorService } = require("services/authorService");

const useAuthors = () => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        // if (!query) return;

        const fetchData = async () => {
            setStatus('fetching');
            const response = await authorService.getAuthors()
            const data = await response.data
            setData(data);
            setStatus('fetched');
        };

        fetchData();
    }, []);

    return { status, data };
};

export default useAuthors

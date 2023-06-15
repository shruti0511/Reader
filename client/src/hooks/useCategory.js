import { useEffect, useState } from "react";
import categoryService from "services/categoryService";


const useCategories = () => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        // if (!query) return;

        const fetchData = async () => {
            setStatus('fetching');
            const response = await categoryService.getCategories()
            const data = await response.data
            setData(data);
            setStatus('fetched');
        };

        fetchData();
    }, []);

    return { status, data };
};

export default useCategories

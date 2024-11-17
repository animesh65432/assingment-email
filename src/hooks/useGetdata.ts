import axios, { AxiosError } from 'axios';
import { useState } from 'react';

const useGetData = <T = any>() => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); // Track errors

    const getData = async (url: string): Promise<T | []> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(url);
            const result = response?.data?.data?.list;
            return result;
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError.message || 'An error occurred');
            console.error('Error fetching data:', axiosError);
            return []
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, getData };
};

export default useGetData;

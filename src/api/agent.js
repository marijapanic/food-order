import { useCallback, useEffect, useState } from "react";

export const DOMAIN = "http://localhost:3000";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    return await response.json();
}

export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(data) {
        try {
            setIsLoading(true);
            const response = await sendHttpRequest(url, { ...config, body: data });

            setData(response);

        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [url, config])

    useEffect(() => {
        if (!config || (config && config.method == "GET" || !config.method)) {
            sendRequest();
        }

    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}
import { useCallback, useEffect, useState } from "react";

export const DOMAIN = "http://localhost:3000";

export function SubmitOrder(orderParams) {
    fetch(`${DOMAIN}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderParams)
    });
}

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
    const sendRequest = useCallback(async function sendRequest() {
        try {
            setIsLoading(true);
            const response = await sendHttpRequest(url, config);

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
        sendRequest
    }
}
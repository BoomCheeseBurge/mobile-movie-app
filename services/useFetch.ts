import { useEffect, useState } from "react";

/**
 * fetchFunction can be any function like the fetchMovies function, for example
 * 
 * @param fetchFunction 
 */
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {

        try {
            // Show loading
            setLoading(true);
            // Reset previous or any errors
            setError(null);

            // Call the function from the param
            const result = await fetchFunction();

            // Assign fetched result
            setData(result);
        } catch (error) {
            // @ts-ignore
            setError(err instanceof Error ? error : new Error('An error occurred'));
        } finally {
            // Executed after either try or catch
            setLoading(false);
        }
    }

    // Reset function if needed
    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    // Call this hook when the component loads
    useEffect(() => {

        // Check if auto-fetch is set to true
        if (autoFetch) {
            fetchData();
        }
        
    }, []);
        
        return { data, loading, error, refetch: fetchData, reset};
}

export default useFetch;

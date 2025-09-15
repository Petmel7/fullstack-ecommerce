import { useState, useCallback } from "react";

type AsyncFn<T> = (...args: any[]) => Promise<T>;

interface UseAsyncReturn<T> {
    run: (...args: Parameters<AsyncFn<T>>) => Promise<T | undefined>;
    loading: boolean;
    error: string | null;
    data: T | null;
    reset: () => void;
}

export function useAsync<T>(asyncFn: AsyncFn<T>): UseAsyncReturn<T> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const run = useCallback(
        async (...args: Parameters<AsyncFn<T>>): Promise<T | undefined> => {
            setLoading(true);
            setError(null);
            try {
                const result = await asyncFn(...args);
                setData(result);
                return result;
            } catch (err: any) {
                setError(err.message || "Something went wrong");
                return undefined;
            } finally {
                setLoading(false);
            }
        },
        [asyncFn]
    );

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setData(null);
    }, []);

    return { run, loading, error, data, reset };
}

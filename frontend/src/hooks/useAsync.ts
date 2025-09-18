
import { useState, useCallback } from "react";

type AsyncFunction<T, A extends unknown[] = unknown[]> = (...args: A) => Promise<T>;

export interface UseAsyncReturn<T, A extends unknown[] = unknown[]> {
    run: (...args: A) => Promise<T | undefined>;
    loading: boolean;
    error: string | null;
    data: T | null;
    reset: () => void;
}

export function useAsync<T, A extends unknown[] = unknown[]>(
    asyncFn: AsyncFunction<T, A>
): UseAsyncReturn<T, A> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const run = useCallback(
        async (...args: A) => {
            setLoading(true);
            setError(null);
            try {
                const result = await asyncFn(...args);
                setData(result);
                return result;
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : String(err ?? "Unknown error");
                setError(msg);
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

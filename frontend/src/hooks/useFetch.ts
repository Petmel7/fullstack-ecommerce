
"use client";

import { useEffect, DependencyList } from "react";
import { useAsync, UseAsyncReturn } from "./useAsync";

export function useFetch<T, A extends unknown[] = unknown[]>(
    asyncFn: (...args: A) => Promise<T>,
    options: { autoRun?: boolean; deps?: DependencyList } = {}
): UseAsyncReturn<T, A> {
    const { autoRun = true, deps = [] } = options;
    const asyncState = useAsync<T, A>(asyncFn);

    useEffect(() => {
        if (autoRun) {
            asyncState.run(...([] as unknown as A));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoRun, ...deps]);

    return asyncState;
}


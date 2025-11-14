    import { useEffect, useState, useMemo, useRef } from "react";

    const STALE_TIME = 0.5 * 60 * 1_000;
    const MAX_RETRIES = 3;
    const INITIAL_RETRY_DELAY = 1_000;
    interface CacheEntry<T> {
    data: T;
    lastFetched: number;
    }

    export const useCustomFetch = <T>(
    url: string
    ): { data: T | null; isPending: boolean; isError: boolean } => {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const storageKey = useMemo((): string => url, [url]);

    const abortControllerRef = useRef<AbortController | null>(null);

    const retryTimeoutRef = useRef<number | null>(null);

    useEffect((): (() => void) => {
        abortControllerRef.current = new AbortController();
        setIsError(false);

        const fetchData = async (currentRetry = 0): Promise<void> => {
        const currentTime = new Date().getTime();
        const cachedItem = localStorage.getItem(storageKey);


        if (cachedItem) {
            try {
            const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

            if (currentTime - cachedData.lastFetched < STALE_TIME) {
                setData(cachedData.data);
                setIsPending(false);
                console.log("캐시된 데이터 사용", url);
                return;
            }

            setData(cachedData.data);
            console.log("만료된 캐시 데이터 사용", url);
            } catch {
            localStorage.removeItem(storageKey);
            console.warn("캐시 에러: 캐시 삭제함", url);
            }
        }

        setIsPending(true);

        try {
            const response = await fetch(url, {
            signal: abortControllerRef.current?.signal,
            });

            if (!response.ok) {
            throw new Error("Failed to fetch data");
            }

            const newData = (await response.json()) as T;
            setData(newData);

            const newCacheEntry: CacheEntry<T> = {
            data: newData,
            lastFetched: new Date().getTime(), 
            };

            localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
            console.log("요청 취소됨", url);

            return;
            }

            if (currentRetry < MAX_RETRIES) {

            const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
            console.log(
                `재시도, ${
                currentRetry + 1
                }/${MAX_RETRIES} Retrying ${retryDelay}ms later`
            );

            retryTimeoutRef.current = setTimeout((): void => {
                fetchData(currentRetry + 1);
            }, retryDelay);
            } else {
            setIsError(true);
            setIsPending(false);
            console.log("최대 재시도 횟수 초과", url);
            return;
            }

            setIsError(true);
            console.log(error);
        } finally {
            setIsPending(false);
        }
        };

        fetchData();

        return (): void => {
        abortControllerRef.current?.abort();
        if (retryTimeoutRef.current !== null) {
            clearTimeout(retryTimeoutRef.current);
            retryTimeoutRef.current = null;
        }
        };
    }, [url, storageKey]);

    return { data, isPending, isError };
    };

// useQuery를 직접 구현한 커스텀 훅

import { useEffect, useMemo, useRef, useState } from "react";

const STALE_TIME = 10 * 1000; // 10초

// 재시도(retry) 관련
const INITIAL_RETRY_DELAY = 1_000; // 1초마다 재시도
const MAX_RETRIES = 3; // 총 3번

// 로컬스토리지에 저장할 데이터 구조
interface CacheEntry<T> {
  data: T;
  lastFetched: number; // 마지막으로 데이터를 가져온 시점의 타임스탬프
}

export const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // queryKey로 쓸거
  const storageKey = useMemo(() => url + "data", [url]);

  // AbortController (state로 관리하면, 렌더링시마다 값이 날아가기 때문)
  const abortControllerRef = useRef<AbortController | null>(null);
  // retry 관련 (state로 관리하면, 렌더링시마다 값이 날아가기 때문)
  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    const fetchData = async (currentRetry = 0) => {
      const currentTime = new Date().getTime();
      const cachedItem = localStorage.getItem(storageKey);

      // 캐시 데이터 확인, 신선도 검증
      if (cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

          // 캐시가 신선한 경우(STALE_TIME 이내인 경우) -> 캐시 사용
          if (currentTime - cachedData.lastFetched < STALE_TIME) {
            setData(cachedData.data);
            setIsPending(false);
            console.log("캐시된 데이터 사용: ", url);
            return;
          }

          // 캐시가 만료된 경우 -> 일단 보여주고, fetch로 최신화
          setData(cachedData.data);
          console.log("만료된 캐시 사용: ", url);
        } catch (error) {
          localStorage.removeItem(storageKey);
          console.warn("캐시 에러: 캐시 삭제함 ", url, error);
        }
      }

      // 저장된 캐시가 없다면, 새로 fetch 해오기
      setIsPending(true);
      setIsError(false);

      try {
        const response = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        });

        // fetch에서는 400/500대 에러가 안잡히므로 직접 처리
        if (!response.ok) {
          throw new Error(`데이터 패치 실패`);
        }

        // 새로운 데이터 받아오기 (캐시 없는 경우)
        const newData = (await response.json()) as T;
        setData(newData);

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(),
        };
        // 로컬스토리지에 캐시 저장
        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
      } catch (error) {
        // AbortError 처리
        if (error instanceof Error && error.name === "AbortError") {
          console.log("요청이 취소되었습니다: ", url);
          return;
        }
        // 만약 실패했다면 retry
        if (currentRetry < MAX_RETRIES) {
          // 지수 백오프 (1 -> 2 -> 4 -> 8 -> ...)
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
          console.log(
            `재시도 ${
              currentRetry + 1
            }/${MAX_RETRIES} - ${retryDelay}ms 후에 다시 시도합니다: `,
            url
          );
          // 다시 요청을 보냄
          retryTimeoutRef.current = window.setTimeout(() => {
            fetchData(currentRetry + 1);
          }, retryDelay);
          return;
        } else {
          setIsError(true);
          setIsPending(false);
          console.log("최대 재시도 횟수 초과. 에러 처리합니다: ", url);
          return;
        }
        setIsError(true);
        console.log("에러 발생: ", error);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();

    // abort 클린업
    return () => {
      abortControllerRef.current?.abort();

      // 예약된 재시도 타이머 취소
      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url, storageKey]);

  return { data, isPending, isError };
};

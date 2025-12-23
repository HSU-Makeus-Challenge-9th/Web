import { useEffect, useState, useMemo, useRef } from "react";

// 상수 정의
const STALE_TIME = 5 * 60 * 1_000; // 5분
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1_000; // 1초

// 로컬 스토리지에 저장할 데이터의 구조
interface CacheEntry<T> {
  data: T;
  lastFetched: number;
}

// 💡 필수 수정: 훅에 제네릭 <T>를 추가하여 타입 안정성을 확보
export const useCustomFetch = <T>(
  url: string
): { data: T | null; isPending: boolean; isError: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const storageKey = useMemo((): string => url, [url]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<number | null>(null); // 재시도 타이머 ID 저장

  useEffect((): void => {
    // 1. 초기화 및 AbortController 생성
    abortControllerRef.current = new AbortController();
    setIsError(false);

    // 💡 재시도 횟수를 인자로 받도록 수정
    const fetchData = async (currentRetry: number = 0): Promise<void> => {
      const currentTime = new Date().getTime();
      const cachedItem = localStorage.getItem(storageKey);

      // (네트워크 요청 전) 캐시 확인 (첫 번째 시도일 때만)
      if (currentRetry === 0 && cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

          if (currentTime - cachedData.lastFetched < STALE_TIME) {
            // 🚨 필수 수정: 캐시 객체 전체가 아닌, 실제 데이터(.data)를 저장
            setData(cachedData.data);
            setIsPending(false);
            console.log("캐시된 데이터 사용", url);
            return; // Fresh 캐시 사용 후 종료
          }

          // 캐시 만료: Stale-While-Revalidate 패턴을 위해 만료된 데이터 먼저 표시
          setData(cachedData.data);
          console.log("만료된 캐시 데이터 사용 (백그라운드 갱신)", url);
        } catch {
          localStorage.removeItem(storageKey);
          console.warn("캐시 에러 : 캐시 삭제함", url);
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

        // 2. 성공 시 캐시 저장 로직
        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(),
        };
        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));

        // 성공했으므로 에러 상태 초기화 (재시도 중 성공한 경우 대비)
        setIsError(false);
      } catch (error) {
        // 3. 요청 취소(Canceled) 에러 처리
        if (error instanceof Error && error.name === "AbortError") {
          console.log("요청 취소됨", url);
          return; // 취소된 요청은 에러로 간주하지 않고 종료
        }

        // 4. 재시도(Retry) 로직 실행
        if (currentRetry < MAX_RETRIES) {
          // 지수 백오프 전략 (1s, 2s, 4s, ...)
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);

          console.log(
            `재시도 ${currentRetry + 1}/${MAX_RETRIES} - ${retryDelay}ms 후 시도`
          );

          // 다음 재시도를 예약하고, 타이머 ID를 ref에 저장 (클린업을 위해)
          retryTimeoutRef.current = setTimeout(
            () => fetchData(currentRetry + 1),
            retryDelay
          ) as unknown as number; // Node.js 환경 호환을 위해 as number 추가 (브라우저에서는 number)

          // 재시도 요청을 예약했으므로 현재 함수 종료
          return;
        } else {
          // 5. 최대 재시도 횟수 초과 시 최종 에러 처리
          setIsError(true);
          console.error("Fetch 최종 실패:", error);
        }
      } finally {
        // 재시도 요청을 예약한 경우 isPending을 유지해야 하므로 조건 추가
        if (currentRetry >= MAX_RETRIES || !isError) {
          setIsPending(false);
        }
      }
    };

    fetchData(); // 훅이 마운트될 때 첫 요청 시작 (currentRetry = 0)

    // 6. 클린업 함수 (Unmount 또는 URL 변경 시 실행)
    return (): void => {
      // 6-1. 진행 중인 네트워크 요청 취소 (경쟁 상태 방지)
      abortControllerRef.current?.abort();

      // 6-2. 예약된 재시도 타이머 취소 (메모리 누수 및 오동작 방지)
      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url, storageKey]);

  // 💡 필수 수정: 반환 타입에 isPending과 isError 포함
  return { data, isPending, isError };
};

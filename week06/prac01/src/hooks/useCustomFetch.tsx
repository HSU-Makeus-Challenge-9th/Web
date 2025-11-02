import { useEffect, useState, useMemo, useRef } from 'react';

// STALE_TIME: 5분
const STALE_TIME = 5 * 60 * 1000; 

// 캐시 엔트리 구조 정의
interface CacheEntry<T> {
  data: T;
  lastFetched: number;
}

export function useCustomFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // URL을 기반으로 한 캐시 키
  const storageKey = useMemo(() => url, [url]); 
  
  // 경쟁 상태 방지를 위한 AbortController
  const abortControllerRef = useRef<AbortController | null>(null); 
  
  // 재시도 타이머 취소를 위한 Ref
  const retryTimeoutRef = useRef<number | null>(null); 

  // 재시도 설정
  const MAX_RETRIES = 3;
  const INITIAL_RETRY_DELAY = 1000; // 1초

  const fetchData = async (currentRetry: number = 0) => {
    
    // 1. 캐시 확인 및 신선도 검증
    const currentTime = new Date().getTime();
    const cachedItem = localStorage.getItem(storageKey);

    if (cachedItem) {
      try {
        const cachedData: CacheEntry<T> = JSON.parse(cachedItem);
        // 신선도 검증: 현재 시간 - 마지막 패치 시간 < STALE_TIME
        const isFresh = currentTime - cachedData.lastFetched < STALE_TIME;

        if (isFresh) {
          setData(cachedData.data);
          setIsPending(false);
          console.log(`[캐시 히트] 캐시된 데이터 사용: ${url}`);
          return; // 네트워크 요청 없이 함수 종료
        } else {
          // 캐시가 오래된 경우: 일단 보여주고 새 데이터 요청 준비
          setData(cachedData.data);
          console.log(`[캐시 만료] 만료된 캐시 데이터 사용, 새 요청 시작: ${url}`);
        }
      } catch {
        localStorage.removeItem(storageKey); // 캐시 손상 시 삭제
      }
    }

    // 2. 네트워크 요청 시작
    setIsPending(true);
    setIsError(false); // 재요청 시 에러 상태 초기화

    // AbortController 인스턴스 생성 및 current에 저장
    abortControllerRef.current = new AbortController(); 

    try {
      // AbortController의 signal 전달
      const response = await fetch(url, { signal: abortControllerRef.current.signal }); 

      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }

      const newData: T = await response.json();
      setData(newData);

      // 3. 성공 시 캐시에 저장
      const newCacheEntry: CacheEntry<T> = {
        data: newData,
        lastFetched: new Date().getTime(),
      };
      localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
      
    } catch (error) {
      // 요청 취소 에러(AbortError)는 정상 동작으로 간주하고 무시
      if (error instanceof Error && error.name === 'AbortError') {
        console.log(`[Fetch Cancelled] Request for ${url} was cancelled.`);
        return; 
      }
      
      // 4. 재시도 로직
      if (currentRetry < MAX_RETRIES) {
        // 지수 백오프 방식 지연 시간 계산
        const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry); 
        
        console.log(`재시도 (${currentRetry + 1}/${MAX_RETRIES}) - 지연 시간: ${retryDelay}ms`);

        // 예약된 타이머를 Ref에 저장
        retryTimeoutRef.current = window.setTimeout(() => 
          fetchData(currentRetry + 1), retryDelay // 재귀 호출 및 재시도 횟수 증가
        );

      } else {
        // 최대 재시도 횟수 초과
        setIsError(true);
        console.error(`[Fetch Failed] 최대 재시도 횟수 (${MAX_RETRIES}) 초과`);
      }
    } finally {
      // 로딩 종료
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      // 클린업 함수: 언마운트 시 진행 중인 요청 취소
      abortControllerRef.current?.abort();
      
      // 예약된 재시도 타이머 취소
      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url, storageKey]);

  return { data, isPending, isError };
}
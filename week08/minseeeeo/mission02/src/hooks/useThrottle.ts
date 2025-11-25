import { useCallback, useRef } from "react";

/**
 * 콜백 함수를 일정 주기마다 한 번만 실행되도록 제한하는 커스텀 훅
 * @param callback - 스로틀링할 콜백 함수
 * @param interval - 실행 간격(ms)
 * @returns 스로틀링된 콜백 함수
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  interval: number
): (...args: Parameters<T>) => void {
  const lastExecuted = useRef<number>(0);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastExecution = now - lastExecuted.current;

      // 마지막 실행 이후 interval 시간이 지났다면 즉시 실행
      if (timeSinceLastExecution >= interval) {
        callback(...args);
        lastExecuted.current = now;
      } else {
        // 아직 interval 시간이 지나지 않았다면 기존 대기 중인 타이머 제거
        // (새로운 호출이 왔으므로 이전 대기는 취소)
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }

        // 남은 시간 후에 실행하도록 타이머 설정
        timeoutId.current = setTimeout(() => {
          callback(...args);
          lastExecuted.current = Date.now();
          timeoutId.current = null;
        }, interval - timeSinceLastExecution);
      }
    },
    [callback, interval]
  );

  // cleanup 함수: 언마운트 시 타이머 정리
  useCallback(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, []);

  return throttledCallback;
}

export default useThrottle;

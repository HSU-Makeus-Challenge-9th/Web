import { useCallback, useRef } from "react";

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
        // 아직 interval 중이면 기존 대기 중인 타이머 제거
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

  // cleanup 함수
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

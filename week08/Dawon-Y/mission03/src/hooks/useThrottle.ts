import { useState, useEffect, useRef } from 'react';

/**
 * useThrottle - 값 쓰로틀링 훅
 * @param value - 쓰로틀할 값
 * @param interval - 쓰로틀 간격 (ms)
 * @returns 쓰로틀된 값
 */
export const useThrottle = <T>(value: T, interval: number = 1000): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastExecuted.current;

    if (elapsed >= interval) {
      // interval이 지났으면 즉시 업데이트
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      // interval이 안 지났으면 남은 시간 후에 업데이트
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval - elapsed);
    }

    // 언마운트/의존성 변경 시 타이머 정리
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, interval]);

  return throttledValue;
};

export default useThrottle;
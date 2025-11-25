// src/hooks/useThrottle.ts
import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, delay: number = 500): T {
  // 스로틀링이 적용된 최종 값
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // 마지막으로 업데이트가 실행된 시간 (리렌더링 유발 X)
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();

    // 1. 충분한 시간이 지났다면 바로 업데이트
    if (now >= lastExecuted.current + delay) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      // 2. 아직 delay 가 안 지났다면 남은 시간 후에 업데이트 예약
      const timeRemaining = delay - (now - lastExecuted.current);

      const timerId = window.setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, timeRemaining);

      // 3. 다음 effect 실행 / 언마운트 시 기존 타이머 정리
      return () => {
        window.clearTimeout(timerId);
      };
    }
  }, [value, delay]);

  return throttledValue;
}

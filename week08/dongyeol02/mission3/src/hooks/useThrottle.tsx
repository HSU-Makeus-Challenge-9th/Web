import { useRef, useState, useEffect } from "react";

function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef<number>(Date.now());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => {
      if (Date.now() - lastRan.current >= interval) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      } else {
        // 이전 타이머 있으면 정리
        if (timer.current) {
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }, interval - (Date.now() - lastRan.current));
      }
    };

    handler();

    // 클린업 함수띠
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [value, interval]);

  return throttledValue;
}

export default useThrottle;

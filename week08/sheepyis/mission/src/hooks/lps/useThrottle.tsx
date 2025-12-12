import { useRef, useEffect, useCallback } from "react";

function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const lastCalled = useRef(0);
  const timerId = useRef<number | null>(null);

  const throttled = useCallback(
    (...args: any[]) => {
      const now = Date.now();
      const remaining = delay - (now - lastCalled.current);

      if (remaining <= 0) {
        if (timerId.current) {
          clearTimeout(timerId.current);
          timerId.current = null;
        }

        console.log("throttled 즉시 실행:", new Date().toLocaleTimeString());
        lastCalled.current = now;
        callback(...args);
      } else if (!timerId.current) {
        timerId.current = window.setTimeout(() => {
          console.log("throttled 지연 실행:", new Date().toLocaleTimeString());
          lastCalled.current = Date.now();
          timerId.current = null;
          callback(...args);
        }, remaining);
      }
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, []);

  return throttled;
}

export default useThrottle;

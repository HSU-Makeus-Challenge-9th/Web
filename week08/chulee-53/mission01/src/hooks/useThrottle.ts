import { useRef, useCallback } from "react";

export default function useThrottleFn(fn: (...args: any[]) => void, delay: number) {
  const lastRun = useRef(0);

  return useCallback(
    (...args: any[]) => {
      const now = Date.now();

      if (now - lastRun.current >= delay) {
        lastRun.current = now;
        fn(...args);
      }
    },
    [fn, delay]
  );
}

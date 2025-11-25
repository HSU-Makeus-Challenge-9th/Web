import { useCallback, useEffect, useRef } from "react";

export function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttledFn = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) return;

      callback(...args);
      timer.current = setTimeout(() => {
        timer.current = null;
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return throttledFn;
}

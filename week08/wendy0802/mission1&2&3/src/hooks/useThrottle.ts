import { useCallback, useEffect, useRef } from "react";

type AnyFn = (...args: never[]) => void;

export const useThrottle = <T extends AnyFn>(
  callback: T,
  interval = 300
) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number | null>(null);
  const lastExecutedRef = useRef(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const remaining = interval - (now - lastExecutedRef.current);

      const invoke = () => {
        lastExecutedRef.current = Date.now();
        callbackRef.current(...args);
      };

      if (remaining <= 0) {
        if (timeoutRef.current !== null) {
          window.clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        invoke();
      } else if (timeoutRef.current === null) {
        timeoutRef.current = window.setTimeout(() => {
          timeoutRef.current = null;
          invoke();
        }, remaining);
      }
    },
    [interval]
  );
};


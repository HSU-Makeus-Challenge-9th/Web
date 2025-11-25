import { useState, useEffect, useRef } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay만큼 시간이 지나고 값을 업데이트하는 타이머
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup 함순
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

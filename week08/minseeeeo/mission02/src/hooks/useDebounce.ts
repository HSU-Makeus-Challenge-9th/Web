import { useEffect, useState } from "react";

/**
 * 값을 지연시켜 반환하는 커스텀 훅
 * @param value - 지연시킬 값
 * @param delay - 지연 시간(ms)
 * @returns 지연된 값
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay 시간 후에 값을 업데이트하는 타이머 설정
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup 함수: 언마운트 또는 의존성 변경 시 타이머 정리
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // value나 delay가 변경될 때마다 effect 재실행

  return debouncedValue;
}

export default useDebounce;

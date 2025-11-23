import { useState, useEffect } from 'react';

/**
 * useDebounce - 값 지연형 디바운스 훅
 * @param value - 디바운스할 값
 * @param delay - 지연 시간 (ms)
 * @returns 지연된 값
 */
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay 후에 값 업데이트
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 언마운트/의존성 변경 시 타이머 정리
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // delay 변경도 즉시 반영

  return debouncedValue;
};

export default useDebounce;
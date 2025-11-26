import { useState, useEffect } from 'react';

/**
 * useDebounce - 값의 변경을 지연시키는 커스텀 훅
 * 
 * @template T - 디바운스할 값의 타입
 * @param {T} value - 디바운스할 원본 값
 * @param {number} delay - 지연 시간 (밀리초, 기본값: 500ms)
 * @returns {T} - 디바운스된 값
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   // debouncedSearch가 변경될 때만 API 호출
 *   fetchData(debouncedSearch);
 * }, [debouncedSearch]);
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  // 디바운스된 값을 저장할 state
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay 시간 후에 값을 업데이트하는 타이머 설정
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 클린업 함수: 컴포넌트 언마운트 또는 value/delay 변경 시 타이머 정리
    // 이전 타이머를 취소하여 마지막 변경사항만 반영되도록 함
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // value 또는 delay가 변경될 때마다 effect 재실행

  return debouncedValue;
}

export default useDebounce;

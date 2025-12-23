import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  // 1. 디바운스된 값을 저장할 상태
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // 2. value 또는 delay가 변경될 때마다 실행
  useEffect(() => {
    // 딜레이 시간 후에 debouncedValue를 원본 value로 업데이트하는 타이머를 시작
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 3. 클린업(Cleanup) 함수: 이전 타이머 취소
    // 새로운 value가 들어올 때마다 이전 타이머를 취소하여,
    // 마지막 입력 후 delay 시간이 지나야만 실행되도록 보장
    return () => {
      clearTimeout(handler);
    };

    // 의존성 배열에 value와 delay를 넣어, 값이 바뀔 때마다 useEffect 재실행
  }, [value, delay]);

  // 4. 디바운스된 최종 값을 반환
  return debouncedValue;
}

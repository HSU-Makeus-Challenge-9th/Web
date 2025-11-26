import { useRef, useEffect, useCallback } from 'react';

/**
 * useThrottle - 함수 호출을 일정 주기로 제한하는 커스텀 훅
 * 
 * @template T - 콜백 함수의 타입
 * @param {T} callback - 쓰로틀링할 함수
 * @param {number} interval - 함수 실행 간격 (밀리초, 기본값: 1000ms)
 * @returns {T} - 쓰로틀링이 적용된 함수
 * 
 * @description
 * - 첫 번째 호출은 즉시 실행됩니다.
 * - 이후 interval 시간 동안은 추가 호출이 무시됩니다.
 * - interval 이후 다시 호출 가능해집니다.
 * 
 * @example
 * const handleScroll = useThrottle(() => {
 *   console.log('Scroll event');
 * }, 1000);
 * 
 * useEffect(() => {
 *   window.addEventListener('scroll', handleScroll);
 *   return () => window.removeEventListener('scroll', handleScroll);
 * }, [handleScroll]);
 */
function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  interval: number = 1000
): T {
  // 쓰로틀링 활성화 여부를 추적하는 ref
  const throttling = useRef<boolean>(false);
  // 타이머 ID를 저장하는 ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // 쓰로틀링이 적용된 함수
  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      // 이미 쓰로틀링 중이면 함수 실행 무시
      if (throttling.current) {
        return;
      }

      // 함수 즉시 실행
      callback(...args);

      // 쓰로틀링 시작
      throttling.current = true;

      // interval 이후 쓰로틀링 해제
      timerRef.current = setTimeout(() => {
        throttling.current = false;
        timerRef.current = null;
      }, interval);
    },
    [callback, interval]
  ) as T;

  return throttledCallback;
}

export default useThrottle;

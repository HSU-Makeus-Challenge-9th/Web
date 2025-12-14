import { useEffect, useRef, useState } from 'react';
import { useThrottle } from './useThrottle';

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  throttleInterval?: number; // 쓰로틀 간격 (ms)
}

export const useIntersectionObserver = ({ 
  onIntersect, 
  enabled = true,
  throttleInterval = 1000, // 기본 1초
}: UseIntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [intersectCount, setIntersectCount] = useState(0);
  
  // intersectCount를 throttle 처리
  const throttledCount = useThrottle(intersectCount, throttleInterval);

  // throttledCount가 변경될 때만 onIntersect 호출
  useEffect(() => {
    if (throttledCount > 0 && enabled) {
      console.log(`[Throttle] fetchNextPage 호출 - ${throttleInterval}ms 간격`);
      onIntersect();
    }
  }, [throttledCount, enabled, onIntersect, throttleInterval]);

  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('[Observer] 요소 감지됨');
          // 감지될 때마다 count 증가 (throttle이 처리)
          setIntersectCount((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled]);

  return targetRef;
};

export default useIntersectionObserver;
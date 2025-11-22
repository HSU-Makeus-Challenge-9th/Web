import { useEffect } from 'react';

/**
 * useBodyScrollLock - 배경 스크롤 방지 훅
 * @param isLocked - 스크롤 잠금 여부
 * @param breakpoint - 적용할 브레이크포인트 (기본 1024px)
 */
export const useBodyScrollLock = (isLocked: boolean, breakpoint: number = 1024) => {
  useEffect(() => {
    const isMobile = window.innerWidth < breakpoint;
    
    if (isLocked && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked, breakpoint]);
};

export default useBodyScrollLock;
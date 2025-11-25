import { useState, useEffect, useCallback } from 'react';

interface UseSidebarReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useSidebar = (): UseSidebarReturn => {
  const [isOpen, setIsOpen] = useState(false);

  // Sidebar 열기
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Sidebar 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Sidebar 토글
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // 클린업 함수 - 메모리 누수 방지
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  // 배경 스크롤 방지 (모바일에서만)
  useEffect(() => {
    const checkAndApplyOverflow = () => {
      // 모바일 브레이크포인트 (lg = 1024px)
      const isMobile = window.innerWidth < 1024;
      
      if (isOpen && isMobile) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    };

    checkAndApplyOverflow();
    
    // 화면 크기 변경 시에도 체크
    window.addEventListener('resize', checkAndApplyOverflow);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('resize', checkAndApplyOverflow);
    };
  }, [isOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useSidebar;
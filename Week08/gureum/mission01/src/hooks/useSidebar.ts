import { useState, useEffect, useCallback } from 'react';

/**
 * useSidebar - 사이드바 열림/닫힘 상태를 관리하는 커스텀 훅
 * 
 * @returns {Object} 사이드바 상태와 제어 함수들
 * @property {boolean} isOpen - 사이드바 열림 상태
 * @property {Function} open - 사이드바 열기 함수
 * @property {Function} close - 사이드바 닫기 함수
 * @property {Function} toggle - 사이드바 토글 함수
 * 
 * @description
 * - ESC 키를 누르면 사이드바가 자동으로 닫힙니다.
 * - 사이드바가 열리면 배경 스크롤이 방지됩니다.
 * - 컴포넌트 언마운트 시 이벤트 리스너와 스크롤 상태가 자동으로 정리됩니다.
 * 
 * @example
 * const { isOpen, open, close, toggle } = useSidebar();
 * 
 * return (
 *   <>
 *     <button onClick={toggle}>메뉴</button>
 *     <Sidebar isOpen={isOpen} onClose={close} />
 *   </>
 * );
 */
function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // 사이드바 열기
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  // 사이드바 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 사이드바 토글 (열림 ↔ 닫힘)
  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // ESC 키로 사이드바 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault(); // 브라우저 기본 동작 방지
        event.stopPropagation(); // 이벤트 전파 중지
        console.log('🔑 ESC 키로 사이드바 닫기');
        close();
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown);

    // 클린업 함수: 컴포넌트 언마운트 또는 의존성 변경 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  // 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      // 사이드바가 열리면 body 스크롤 방지
      // overflow: hidden으로 스크롤바 숨김
      document.body.style.overflow = 'hidden';
      console.log('🔒 배경 스크롤 방지 활성화');
    } else {
      // 사이드바가 닫히면 body 스크롤 복원
      document.body.style.overflow = 'unset';
      console.log('🔓 배경 스크롤 방지 해제');
    }

    // 클린업 함수: 컴포넌트 언마운트 시 스크롤 상태 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

export default useSidebar;

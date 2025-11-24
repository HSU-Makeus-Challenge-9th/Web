// src/hooks/useWindowSize.ts (새 파일)

import { useState, useEffect } from "react";

// 화면 너비와 높이를 반환하는 훅
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // 서버 환경(SSR)이 아닌지 확인
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 컴포넌트 마운트 시 초기 크기 설정

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// 1. Context Type 정의 (open, close, toggle 추가)
interface SidebarContextType {
  isSidebarOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

// 2. useSidebar 커스텀 훅
// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);

  if (context === null) {
    throw new Error("provider 안에서 사영하세유");
  }
  return context;
};

// 3. Provider 컴포넌트
interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar 열기 함수 구현
  const open = React.useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  // Sidebar 닫기 함수 구현
  const close = React.useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  // Sidebar 토글 함수 구현
  const toggle = React.useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const value = {
    isSidebarOpen,
    open,
    close,
    toggle,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

import { createContext, useContext, useState } from "react";

import type { ReactNode } from "react";

interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);

  // Provider 내부에서 사용하지 않았을 경우 에러 처리
  if (context === null) {
    throw new Error("provider 안에서 사영하세유");
  }
  return context;
};

// Provider 컴포넌트
interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const value = {
    isSidebarOpen,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

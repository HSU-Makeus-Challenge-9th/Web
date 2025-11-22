import { createContext } from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// HomePage에서 사용할 사이드바 컨텍스트 생성
const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggleSidebar: () => {},
});

export default SidebarContext;

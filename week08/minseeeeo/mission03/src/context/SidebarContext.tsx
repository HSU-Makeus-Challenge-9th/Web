import { createContext } from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  // 미션에서는 open(), close(), toggle()함수로 구현하라고 했지만
  // isOpen상태에 toggleSidebar()로 상태 토글하는 방식으로 구현 했었습니다..ㅎㅎ..
}

// HomePage에서 사용할 사이드바 컨텍스트 생성
const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggleSidebar: () => {},
});

export default SidebarContext;

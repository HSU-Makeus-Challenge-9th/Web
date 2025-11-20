import { useContext } from "react";
import SidebarContext from "../context/SidebarContext";

const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarContext를 찾을 수 없습니다.");
  }
  return context;
};

export default useSidebar;

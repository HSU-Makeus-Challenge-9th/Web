import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme는 반드시 CountProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};

import React, { type ReactNode } from "react";

interface ThemeContentProps {
  children: ReactNode;
}

const ThemeContent: React.FC<ThemeContentProps> = ({ children }) => {
  return <div className="TodoContainer">{children}</div>;
};

export default ThemeContent;

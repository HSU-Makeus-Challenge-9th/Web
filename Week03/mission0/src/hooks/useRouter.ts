// hooks/useRouter.ts
import { createContext, useContext } from "react";

export interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

export const RouterContext = createContext<RouterContextType | null>(null);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error("라우터 안에서만 쓰세요");
  return context;
};

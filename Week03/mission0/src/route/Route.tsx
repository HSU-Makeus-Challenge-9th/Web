
import React from "react";
import { useRouter } from "../hooks/useRouter";

interface RouteProps {
  path: string;
  component: React.ComponentType;
}

export const Route: React.FC<RouteProps> = ({ path, component: Component }) => {
  const { currentPath } = useRouter();
  return currentPath === path ? <Component /> : null;
};

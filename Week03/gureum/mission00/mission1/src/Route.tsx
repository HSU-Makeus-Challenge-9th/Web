import React from "react";
import type { RouteProps } from "./types";

export const Route: React.FC<RouteProps> = ({ component: Component }) => {
  return <Component />;
};

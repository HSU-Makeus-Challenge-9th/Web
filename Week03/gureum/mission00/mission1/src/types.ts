import type { ReactNode, ComponentType } from "react";

export type LinkProps = {
  to: string;
  replace?: boolean;
  children: ReactNode;
};

export type RouteProps = {
  path: string;
  component: ComponentType;
};

export type RoutesProps = {
  children: ReactNode;
};

// Routes.tsx
import React, {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { useCurrentPath } from "./useCurrentPath";

export type RouteProps = { path: string; component: React.ComponentType };

function isRouteElement(node: ReactNode): node is ReactElement<RouteProps> {
  if (!isValidElement(node)) return false;                // 1) 먼저 좁힘
  const props = node.props as Partial<RouteProps>;        // 2) 안전하게 꺼냄
  return typeof props.path === "string" && !!props.component;
}

export function Routes({ children }: { children: ReactNode }) {
  const current = useCurrentPath();
  const routes = Children.toArray(children).filter(isRouteElement);
  const active = routes.find(r => r.props.path === current);
  if (!active) return null;
  const Comp = active.props.component;
  return <Comp />;
}

export function Route(_props: { path: string; component: React.ComponentType }) {
  return null;
}
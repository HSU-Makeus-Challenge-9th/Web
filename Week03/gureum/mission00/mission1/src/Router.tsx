import React, {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  type FC,
} from "react";
import type { RoutesProps, RouteProps } from "./types";
import { useCurrentPath } from "./hooks/useCurrentPath";

// Link, Route 재수출 (App.tsx의 import 유지)
export { Link } from "./Link";
export { Route } from "./Route";

/** Route 엘리먼트인지 판별 (타입 가드) */
function isRouteElement(
  child: unknown
): child is React.ReactElement<RouteProps> {
  if (!isValidElement(child)) return false;
  const props = (child as React.ReactElement<any>).props;
  return typeof props?.path === "string" && typeof props?.component === "function";
}

export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();

  const activeRoute = useMemo(() => {
    // 🔒 타입 좁히기 + 명시적 제네릭으로 추론 고정
    const routes = Children.toArray(children).filter(isRouteElement) as React.ReactElement<RouteProps>[];

    return routes.find((routeEl) => routeEl.props.path === currentPath) ?? null;
  }, [children, currentPath]);

  if (!activeRoute) return null;

  // <Route .../> 엘리먼트를 그대로 렌더 (Route.tsx에서 component를 실제로 렌더)
  return cloneElement(activeRoute);
};

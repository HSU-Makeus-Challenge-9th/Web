import type { FC } from 'react';
import { useMemo, Children, cloneElement } from 'react';
import type { RoutesProps } from '../types';
import { isRouteElement } from '../utils/isRouteElement';
import { useCurrentPath } from '../hooks/useCurrentPath';



export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();
  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;
  return cloneElement(activeRoute);
};

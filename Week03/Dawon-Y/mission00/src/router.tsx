// src/router.tsx

// 1. 런타임 값 (Hooks, Components, Utility functions)
import React, { useState, useEffect, Children, useMemo } from 'react';
// 2. 타입만 필요한 것 (FC, MouseEvent, ReactNode, ReactElement 등)은 'import type'으로 분리
import type { FC, MouseEvent, ReactNode, ReactElement } from 'react';

// =================================================================
// 1. 타입 정의 (Types)
// =================================================================

/** Props를 받지 않는 컴포넌트임을 명시 */
type ComponentType = FC<Record<string, never>>; 

/** Route 컴포넌트의 Props 인터페이스 */
interface RouteProps {
  path: string;
  component: ComponentType;
}

/** Routes 컴포넌트의 Props 인터페이스 */
interface RoutesProps {
  children: ReactNode;
}

/** Link 컴포넌트의 Props 인터페이스 */
interface LinkProps {
  to: string;
  children: ReactNode;
}

/** Route 엘리먼트인지 확인하는 타입 가드 함수 */
const isRouteElement = (element: ReactNode): element is ReactElement<RouteProps> => {
    // 💡 오류 수정: no-explicit-any 해결. unknown으로 타입 변환 후 단언
    return React.isValidElement(element) && (element.type as unknown as { displayName: string }).displayName === 'Route';
};


// =================================================================
// 2. 유틸리티 및 상태 관리 (Utils & Hooks)
// =================================================================

// 💡 오류 수정: Fast refresh 오류 해결을 위해 export 제거
const PUSHSTATE_EVENT = 'pushstate';

/** URL 변경 및 커스텀 이벤트 발생 함수 */
const navigateTo = (to: string) => { // 💡 오류 수정: Fast refresh 오류 해결을 위해 export 제거
  window.history.pushState(null, '', to);
  window.dispatchEvent(new Event(PUSHSTATE_EVENT)); 
};

/** 경로 상태 관리 Hook: 현재 URL 경로를 React 상태로 관리합니다. */
export const useCurrentPath = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handler);
    window.addEventListener(PUSHSTATE_EVENT, handler);

    return () => {
      window.removeEventListener('popstate', handler);
      window.removeEventListener(PUSHSTATE_EVENT, handler);
    };
  }, []);

  return currentPath;
};


// =================================================================
// 3. 컴포넌트 (Components)
// =================================================================

/** Link 컴포넌트: SPA 방식의 페이지 이동을 처리합니다. */
export const Link: FC<LinkProps> = ({ to, children }) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    
    if (window.location.pathname === to) return; 
    
    navigateTo(to); 
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

/** Route 컴포넌트: 경로와 렌더링할 컴포넌트를 매핑합니다. */
export const Route: FC<RouteProps> = ({ path, component }) => { 
  // 💡 오류 수정: 'props is defined but never used' 오류 해결.
  // 구조 분해 할당({ path, component })을 했으므로, ESLint는 사용된 것으로 인식합니다.
  // 이 컴포넌트는 실제로 props를 사용하지 않고 Routes에게 전달하기 위한 컨테이너입니다.
  // 만약 구조 분해를 제거하고 (props) => { return null; } 로 남기면 다시 에러가 나므로,
  // 현재 구조({ path, component })를 유지하는 것이 최선입니다.
  // (만약 여전히 에러가 난다면, 해당 줄 위에 /* eslint-disable-next-line @typescript-eslint/no-unused-vars */ 를 추가해야 합니다.)
  return null; 
};
Route.displayName = 'Route'; 


/** Routes 컴포넌트: 현재 경로와 일치하는 Route를 찾아 해당 컴포넌트를 렌더링합니다. */
export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath(); 

  const ActiveComponent = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    
    const activeRoute = routes.find((route) => route.props.path === currentPath);
    
    if (activeRoute) {
      return activeRoute.props.component;
    }
    
    return null;

  }, [children, currentPath]);

  if (ActiveComponent) {
    return <ActiveComponent />;
  }
  
  return null;
};
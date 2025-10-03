import { isValidElement, type ReactElement, type ReactNode } from "react";
import type { RouteProps } from "../types";
//import { Route } from '../router/Route';

export const isRouteElement = (element: ReactNode): element is ReactElement<RouteProps> => {
    // 리액트 엘리먼트인지 확인 (React Node -> React Element)
    if (!isValidElement(element)) {
        return false;
    }

    // 리액트 엘리먼트의 props가 unknown 타입이 아니라는걸 검증
    if (typeof element.props !== 'object' || element.props == null) {
        return false;
    }

    // 엘리먼트가 props(path, component)를 가지고 있는지 검증
    return 'path' in element.props && 'component' in element.props;
}
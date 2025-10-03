import { ROUTER_EVENT } from "../constants/router";

export const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);

    // 훅이 감지 가능하도록 커스텀 이벤트 생성, 발생
    const navigationEvent = new Event(ROUTER_EVENT.PUSH);
    window.dispatchEvent(navigationEvent);
}
import { useState, useEffect } from "react";
import { ROUTER_EVENT } from "../constants/router";

export const useCurrentPath = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };

    // navigateTo로 url 변경됐을때 발생하는 커스텀 이벤트
    window.addEventListener(ROUTER_EVENT.PUSH, onLocationChange); 

    // 뒤로/앞으로 가기 했을때 발생하는 이벤트
    window.addEventListener(ROUTER_EVENT.POP, onLocationChange);  

    return () => {
      window.removeEventListener(ROUTER_EVENT.PUSH, onLocationChange);
      window.removeEventListener(ROUTER_EVENT.POP, onLocationChange);
    }
  }, []);

  console.log('useCurrentPath hook: ', path);
  return path;
}
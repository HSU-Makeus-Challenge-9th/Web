import { LOCAL_STORAGE_KEY } from "../constants/constants";

export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      if (typeof window !== "undefined") {
        const valueToStore = JSON.stringify(value);
        window.localStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      console.error("Error setting local storage:", error);
    }
  };

  const getItem = () => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
      return null;
    } catch (error) {
      console.error("Error getting local storage:", error);
      return null;
    }
  };

  const removeItem = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error removing local storage:", error);
    }
  };

  return { setItem, getItem, removeItem };
};

// 훅이 아닌 곳(예: Axios 인터셉터)에서 토큰을 가져오기 위한 보조 함수
export const getLocalStorageToken = (key: string): string | null => {
  try {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      if (!item) return null;

      // JSON.parse 시도 (useLocalStorage.setItem으로 저장했을 경우 대비)
      try {
        const parsedItem = JSON.parse(item);
        // 파싱된 값이 문자열이면 토큰으로 간주
        return typeof parsedItem === "string" ? parsedItem : item;
      } catch (e) {
        // 파싱 실패 시 일반 문자열로 간주
        return item;
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting local storage token:", error);
    return null;
  }
};

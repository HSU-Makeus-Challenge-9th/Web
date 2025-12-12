export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      // string이면 그대로, 객체면  JSON.stringify하여 저장
      const valueToStore =
        typeof value === "string" ? value : JSON.stringify(value);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.log(error);
    }
  };
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;

      // JSON 형식이면 파싱하여 반환, 아니면 그대로 반환
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }

      //return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  return { setItem, getItem, removeItem };
};

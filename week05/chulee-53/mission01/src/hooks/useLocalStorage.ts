export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
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
      if (item === null) return null;
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch {
      return null;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  return { setItem, getItem, removeItem };
};

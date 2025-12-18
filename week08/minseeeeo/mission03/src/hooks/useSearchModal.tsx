import { useContext } from "react";
import { SearchModalContext } from "../context/SearchModalContext";

export const useSearchModal = () => {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error(
      "오류: useSearchModal 컨텍스트 사용시 SearchModalProvider로 감싸줘야 함"
    );
  }
  return context;
};

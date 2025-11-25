import { useContext } from "react";
import { RecentSearchesContext } from "../context/RecentSearchContext";

export const useRecentSearches = () => {
  const context = useContext(RecentSearchesContext);
  if (!context) {
    throw new Error("오류: SearchContext 사용할떄 provider로 감싸주지 않음");
  }
  return context;
};

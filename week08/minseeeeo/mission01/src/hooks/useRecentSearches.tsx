import { useContext } from "react";
import { RecentSearchesContext } from "../context/RecentSearchContext";

export const useRecentSearches = () => {
  const context = useContext(RecentSearchesContext);
  if (!context) {
    throw new Error(
      "useRecentSearches must be used within RecentSearchesProvider"
    );
  }
  return context;
};

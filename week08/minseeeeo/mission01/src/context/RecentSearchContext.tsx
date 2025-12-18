import { createContext } from "react";

export interface RecentSearch {
  query: string;
  type: "title" | "tag";
  timestamp: number;
}

interface RecentSearchesContextType {
  recentSearches: RecentSearch[];
  addRecentSearch: (query: string, type: "title" | "tag") => void;
  removeRecentSearch: (query: string, type: "title" | "tag") => void;
  clearRecentSearches: () => void;
}

export const RecentSearchesContext = createContext<
  RecentSearchesContextType | undefined
>(undefined);

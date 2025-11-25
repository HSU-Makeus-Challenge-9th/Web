import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import {
  RecentSearchesContext,
  type RecentSearch,
} from "../context/RecentSearchContext";

const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 5;

export const RecentSearchesProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  // 로컬 스토리지에서 최근 검색어 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    console.log("로컬 스토리지에서 불러온 값:", saved);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log("파싱된 검색어:", parsed);
        setRecentSearches(parsed);
      } catch (error) {
        console.error("Failed to parse recent searches:", error);
      }
    }
  }, []);

  // 최근 검색어 추가
  const addRecentSearch = (query: string, type: "title" | "tag") => {
    console.log("addRecentSearch 호출:", query, type);
    const newSearch: RecentSearch = {
      query,
      type,
      timestamp: Date.now(),
    };

    setRecentSearches((prev) => {
      console.log("이전 검색어들:", prev);
      // 중복 제거 (같은 query와 type)
      const filtered = prev.filter(
        (item) => !(item.query === query && item.type === type)
      );

      // 새 검색어를 맨 앞에 추가하고 최대 개수만큼만 유지
      const updated = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES);

      // 로컬 스토리지에 저장
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      console.log("로컬 스토리지 저장 완료:", updated);
      console.log("실제 저장된 값:", localStorage.getItem(RECENT_SEARCHES_KEY));

      return updated;
    });
  };

  // 최근 검색어 삭제
  const removeRecentSearch = (query: string, type: "title" | "tag") => {
    setRecentSearches((prev) => {
      const updated = prev.filter(
        (item) => !(item.query === query && item.type === type)
      );

      // 로컬 스토리지에 저장
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));

      return updated;
    });
  };

  // 모든 최근 검색어 삭제
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  return (
    <RecentSearchesContext.Provider
      value={{
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </RecentSearchesContext.Provider>
  );
};

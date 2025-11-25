import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRecentSearches } from "../../hooks/useRecentSearches.tsx";

interface SearchModalProps {
  onSearch: (query: string, searchType: "title" | "tag") => void;
  onClose: () => void;
}

const SearchModal = ({ onSearch }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"title" | "tag">("title");
  const {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  } = useRecentSearches();

  //console.log("현재 recentSearches:", recentSearches);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("검색 실행:", searchQuery.trim(), searchType);
      addRecentSearch(searchQuery.trim(), searchType);
      onSearch(searchQuery.trim(), searchType);
    }
  };

  const handleRecentSearchClick = (query: string, type: "title" | "tag") => {
    setSearchQuery(query);
    setSearchType(type);
    onSearch(query, type);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearAll = () => {
    clearRecentSearches();
  };

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto bg-black px-6 py-4">
      <div className="w-full px-16">
        {/* 검색 입력 영역 */}
        <div className="flex items-center gap-3 mb-4">
          {/* 검색 아이콘 */}
          <Search className="text-white" size={20} />

          {/* 검색 입력 */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-transparent text-white placeholder-gray-500 border-none outline-none text-base"
          />

          {/* 검색 타입 선택 드롭다운 */}
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as "title" | "tag")}
            className="bg-black text-white border border-gray-700 rounded px-3 py-1.5 text-sm outline-none cursor-pointer"
          >
            <option value="title">제목</option>
            <option value="tag">태그</option>
          </select>
        </div>

        {/* 최근 검색어 */}
        {recentSearches.length > 0 && (
          <div className="mt-4 border-t border-gray-800 pt-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white text-sm font-medium">최근 검색어</h3>
              <button
                onClick={handleClearAll}
                className="text-gray-500 text-xs hover:text-gray-300 transition-colors"
              >
                모두 지우기
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {recentSearches.map((item, index) => (
                <div
                  key={`${item.query}-${item.type}-${index}`}
                  className="flex items-center justify-between py-2 px-2 rounded hover:bg-gray-900 transition-colors group"
                >
                  <button
                    onClick={() =>
                      handleRecentSearchClick(item.query, item.type)
                    }
                    className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors flex-1 text-left"
                  >
                    <Search size={14} className="text-gray-600" />
                    <span>{item.query}</span>
                  </button>
                  <button
                    onClick={() => removeRecentSearch(item.query, item.type)}
                    className="text-gray-600 hover:text-gray-400 transition-colors p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;

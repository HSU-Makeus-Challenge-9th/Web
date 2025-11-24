import type { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearchClick: () => void;
  isSearching: boolean;
}

const SearchBar = ({
  keyword,
  onKeywordChange,
  onSearchClick,
  isSearching,
}: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onKeywordChange(event.target.value);
  };

  const isDisabled = !keyword.trim() || isSearching;

  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full">
        <div className="flex items-center gap-3 flex-1 rounded-2xl border border-gray-800 bg-[#111113] px-5 py-3 shadow-lg shadow-black/20">
          <FaSearch className="text-gray-400 text-xl" />
          <input
            value={keyword}
            onChange={handleChange}
            type="text"
            placeholder="찾고 싶은 LP 제목을 입력해보세요"
            autoComplete="off"
            className="flex-1 bg-transparent text-white text-base sm:text-lg placeholder:text-gray-500 focus:outline-none"
          />
        </div>
        <button
          type="button"
          disabled={isDisabled}
          className="w-full sm:w-auto rounded-2xl border border-white px-6 py-3 text-base font-semibold transition hover:bg-pink-500 hover:text-black hover:border-pink-500 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={onSearchClick}
        >
          {isSearching ? "검색 중..." : "검색"}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

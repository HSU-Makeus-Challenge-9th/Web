import React, { useState, memo } from "react";
import { MovieFilters, LanguageCode } from "../types/movie";

interface Props {
  onSearch: (filters: MovieFilters) => void;
}

const MovieFilter = memo(({ onSearch }: Props) => {
  const [query, setQuery] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("ko-KR");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, include_adult: includeAdult, language });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              🎬 영화 제목
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="영화 제목을 입력하세요"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div className="w-40">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              🌐 언어
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none cursor-pointer"
            >
              <option value="ko-KR">한국어</option>
              <option value="en-US">영어</option>
              <option value="ja-JP">일본어</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            검색하기
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="adult"
            checked={includeAdult}
            onChange={(e) => setIncludeAdult(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <label
            htmlFor="adult"
            className="text-sm font-medium text-gray-600 cursor-pointer"
          >
            성인 콘텐츠 표시
          </label>
        </div>
      </form>
    </div>
  );
});

export default MovieFilter;

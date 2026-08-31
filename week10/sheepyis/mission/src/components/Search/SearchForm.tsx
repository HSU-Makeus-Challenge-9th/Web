import { useState } from "react";
import type { SearchParams } from "../../types/search/search";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [query, setQuery] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState<SearchParams["language"]>("ko-KR");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSearch({
      query,
      includeAdult,
      language,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-lg bg-white p-4 shadow-md"
    >
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-sm text-gray-700 text-[1.5vw] font-bold">
            🎬 영화 제목
          </label>
          <input
            type="text"
            placeholder="영화 제목을 입력하세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-md border px-3 py-2 text-[1.5vw]"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="adult"
            type="checkbox"
            checked={includeAdult}
            onChange={(e) => setIncludeAdult(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 cursor-pointer"
          />
          <label htmlFor="adult" className="text-sm text-gray-700 text-[1.5vw]">
            🔞 성인 콘텐츠 표시
          </label>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-48">
          <label className="text-sm text-gray-700 text-[1.5vw] font-bold">
            🌐 언어
          </label>
          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value as "ko-KR" | "en-US" | "ja-JP")
            }
            className="rounded-md border px-3 py-2 text-[1.5vw]"
          >
            <option value="ko-KR">한국어</option>
            <option value="en-US">영어</option>
            <option value="ja-JP">일본어</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-500 py-3 text-white font-bold text-[1.5vw] cursor-pointer"
      >
        🔍 검색하기
      </button>
    </form>
  );
};

export default SearchForm;

import { memo, useState, useEffect } from "react";

interface ISearchbar {
  search: string;
  adultChecked: boolean;
  language: string;
  onSearchChange: (keyword: string) => void;
  onAdultChange: (checked: boolean) => void;
  onLanguageChange: (language: string) => void;
}

const Searchbar = ({
  adultChecked,
  language,
  onSearchChange,
  onAdultChange,
  onLanguageChange,
}: ISearchbar) => {
  // 검색바에는 빈 값으로 시작
  const [inputValue, setInputValue] = useState("");

  // 디바운싱: 500ms 후에 검색 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      // 검색어가 있으면 그대로, 없으면 "코난"으로 검색
      onSearchChange(inputValue.trim() || "코난");
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색어가 있으면 그대로, 없으면 "코난"으로 검색
    onSearchChange(inputValue.trim() || "코난");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 mt-10 border border-gray-200 rounded-lg shadow-lg px-5 py-3 w-150">
        {/* 영화 제목 && 옵션 */}
        <div className="flex gap-5">
          {/* 영화 제목 */}
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-center">🎬 영화 제목</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="영화 제목을 입력하세요"
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
            />
          </div>

          {/* 옵션 */}
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-center">⚙️ 옵션</label>
            <div className="flex justify-start items-center border border-gray-200 rounded-lg px-3 py-1.5 gap-2">
              <input
                type="checkbox"
                checked={adultChecked}
                onChange={(e) => onAdultChange(e.target.checked)}
              />{" "}
              <span className="text-sm">성인 콘텐츠 표시</span>
            </div>
          </div>
        </div>

        {/* 언어 */}
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-center text-sm">🌐 언어</label>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white"
          >
            <option value="ko-KR">한국어</option>
            <option value="en-US">영어</option>
            <option value="ja-JP">일본어</option>
          </select>
        </div>

        {/* 검색하기 */}
        <button
          type="submit"
          className="bg-blue-500 border-lg text-white text-sm hover:bg-blue-600 cursor-pointer duration-300 ease-in-out w-full p-2 rounded-lg "
        >
          🔍 검색하기
        </button>
      </div>
    </form>
  );
};

export default memo(Searchbar);

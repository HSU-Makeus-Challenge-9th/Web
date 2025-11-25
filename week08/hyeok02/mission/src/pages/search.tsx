import { useState, useRef, useEffect } from "react";
import Select from "react-select";
import LPList from "../components/lp/lp-list";
import { useDebounce } from "../hooks/utils/usedebounce";
import { useInfiniteSearchLps } from "../hooks/search/useinfinitesearchlp";
import { useInfiniteTagSearchLps } from "../hooks/search/useinfinitetagsearchlp";
import { useThrottle } from "../hooks/utils/usethrottle";

const SearchPage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState({ value: "title", label: "제목" });

  const debouncedKeyword = useDebounce(keyword, 500);

  const searchLpsResult = useInfiniteSearchLps({
    searchType: "title",
    keyword: debouncedKeyword,
    order,
  });

  const tagLpsResult = useInfiniteTagSearchLps({
    tagName: debouncedKeyword,
    order,
  });

  const result = searchType.value === "tag" ? tagLpsResult : searchLpsResult;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = result;

  const observerRef = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useRef<number>(0);

  const throttledHandleObserver = useThrottle(() => {
    scrollPosition.current = window.scrollY;
    fetchNextPage();
  }, 500);

  useEffect(() => {
    const target = observerRef.current;
    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          throttledHandleObserver();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [throttledHandleObserver, hasNextPage, data]);

  const lps = data?.pages.flatMap((page) => page.data) || [];

  const handleOrderChange = (newOrder: "asc" | "desc") => setOrder(newOrder);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);

  return (
    <div className="flex flex-col items-center justify-start p-8">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
          className="border-2 border-yellow-400 rounded p-2 w-[600px] bg-black text-white"
        />
        <div className="w-24">
          <Select
            value={searchType}
            onChange={(option) => option && setSearchType(option)}
            options={[
              { value: "title", label: "제목" },
              { value: "tag", label: "태그" },
            ]}
            styles={{
              control: (provided, state) => ({
                ...provided,
                backgroundColor: "black",
                borderColor: "#FFD700",
                boxShadow: state.isFocused ? "0 0 0 2px #FFD700" : "none",
                color: "white",
                borderWidth: "2px",
                borderRadius: "0.375rem",
                minHeight: "42px",
              }),
              singleValue: (provided) => ({ ...provided, color: "white" }),
              menu: (provided) => ({ ...provided, backgroundColor: "black" }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#333" : "black",
                color: "white",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#333",
                primary: "#FFD700",
                neutral0: "black",
                neutral80: "white",
              },
            })}
          />
        </div>
      </div>

      <div className="flex justify-end w-full mb-4 pr-20">
        <div className="flex border rounded overflow-hidden">
          <button
            onClick={() => handleOrderChange("asc")}
            className={`w-24 px-4 py-1 text-sm ${order === "asc" ? "bg-black text-white" : "bg-white text-black"}`}
          >
            오래된순
          </button>
          <button
            onClick={() => handleOrderChange("desc")}
            className={`w-24 px-4 py-1 text-sm ${order === "desc" ? "bg-black text-white" : "bg-white text-black"}`}
          >
            최신순
          </button>
        </div>
      </div>

      <LPList lps={lps} isLoading={isLoading || isFetchingNextPage} />
      <div ref={observerRef} />
    </div>
  );
};

export default SearchPage;

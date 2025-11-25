import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchLps } from "../../hooks/useSearchLps";
import useDebounce from "../../hooks/useDebounce";
import LoadingSpinner from "../LoadingSpinner";

const LpSearch = () => {
  const [order] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedQuery = useDebounce(searchTerm, 500);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchLps(order, debouncedQuery);

  const allLps = data?.pages.flatMap((page) => page.data) ?? [];

  const isSearchActive = debouncedQuery.trim().length > 0;
  const filteredLps = isSearchActive
    ? allLps.filter((lp) =>
        lp.title.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
      )
    : allLps;

  if (isLoading) {
    return (
      <div className="p-5 bg-gray-900 min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: "20px", color: "red", border: "1px solid red" }}>
        <p>⚠️ 데이터 로딩 중 에러 발생: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col gap-y-5">
      <div className="text-2xl ">LP 목록</div>
      <input
        type="text"
        className="w-1/2 h-10 border border-black/20 rounded-2xl p-4"
        placeholder="제목을 입력하새요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="grid grid-cols-5 gap-4">
        {filteredLps.map((lp) => (
          <Link
            key={lp.id}
            to={`/lp/${lp.id}`}
            className="relative overflow-hidden group"
          >
            <li className="relative block">
              <img
                src={lp.thumbnail}
                alt={`${lp.title} 썸네일`}
                className="w-full h-auto object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 text-white">
                <h3 className="text-lg font-bold truncate">{lp.title}</h3>
                <p className="text-sm text-gray-300">
                  업로드일: {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm font-semibold mt-1">
                  ❤️ 좋아요: {lp.likes?.length ?? 0}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>

      {isFetchingNextPage && (
        <div className="mt-10">
          <LoadingSpinner />
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => fetchNextPage()}
            className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors"
          >
            더 불러오기
          </button>
        </div>
      )}

      {filteredLps.length === 0 && !isLoading && !isError && (
        <p className="text-center text-gray-500 mt-10">표시할 LP가 없습니다.</p>
      )}
    </div>
  );
};

export default LpSearch;

// // src/components/SearchModal.tsx
// import React, { useState, useMemo, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";

// import { useInfiniteGetLpList } from "../hooks/useInfiniteGetLpList";
// import type { LpItem } from "../types/lp";
// import type { SortOrder } from "../types/common";

// interface SearchModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const SearchModal: React.FC<SearchModalProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const navigate = useNavigate();

//   const [searchInput, setSearchInput] = useState("");
//   const [search, setSearch] = useState("");

//   // 최신순 고정
//   const order: SortOrder = "desc";

//   const {
//     data,
//     isPending,
//     isError,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteGetLpList({
//     order,
//     limit: 12,
//     search,
//   });

//   // LP 결과 평탄화
//   const lpItems: LpItem[] = useMemo(
//     () => data?.pages.flatMap((page) => page.data.data || []) ?? [],
//     [data]
//   );

//   if (!isOpen) return null;

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const trimmed = searchInput.trim();
//     if (!trimmed) return;
//     setSearch(trimmed);
//   };

//   const handleResultClick = (id: number) => {
//     onClose();
//     navigate(`/lp/${id}`);
//   };

//   const handleOverlayClick = () => {
//     onClose();
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-start justify-center bg-black/40"
//       onClick={handleOverlayClick}
//     >
//       {/* 모달 박스 */}
//       <div
//         className="mt-20 w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 md:p-6 max-h-[80vh] flex flex-col"
//         onClick={(e) => e.stopPropagation()} // 안쪽 클릭 시 닫히지 않게
//       >
//         {/* 헤더 */}
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//             LP Search
//           </h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
//           >
//             ✕
//           </button>
//         </div>

//         {/* 검색 인풋 영역 */}
//         <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-4">
//           <button
//             type="submit"
//             className="flex items-center justify-center w-10 h-10 rounded-full border bg-gray-50 hover:bg-gray-100"
//           >
//             🔍
//           </button>
//           <input
//             type="text"
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="Type keyword to search"
//             className="flex-1 border-b border-gray-400 focus:outline-none focus:border-black text-base py-1 bg-transparent text-gray-900 placeholder-gray-400"
//           />
//           <button
//             type="button"
//             className="flex items-center gap-1 px-3 py-1.5 border rounded-md text-sm text-gray-700 bg-gray-50"
//           >
//             Title
//             <span className="text-xs">▼</span>
//           </button>
//         </form>

//         {/* 내용 영역 (스크롤) */}
//         <div className="flex-1 overflow-y-auto">
//           {search === "" && (
//             <p className="text-sm text-gray-500">
//               Enter a keyword and press Enter or click 🔍.
//             </p>
//           )}

//           {search !== "" && (
//             <>
//               {isPending && !isFetchingNextPage && (
//                 <p className="text-sm text-gray-500">Searching...</p>
//               )}

//               {isError && (
//                 <p className="text-sm text-red-500">
//                   Error while searching: {(error as Error)?.message}
//                 </p>
//               )}

//               {!isPending && !isError && lpItems.length === 0 && (
//                 <p className="text-sm text-gray-500">
//                   No results found for this keyword.
//                 </p>
//               )}

//               {lpItems.length > 0 && (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
//                   {lpItems.map((lp) => (
//                     <button
//                       key={lp.id}
//                       type="button"
//                       onClick={() => handleResultClick(lp.id)}
//                       className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
//                     >
//                       <img
//                         src={lp.thumbnail}
//                         alt={lp.title}
//                         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.src =
//                             "https://placehold.co/500x500/e5e7eb/111827?text=DOLIGO";
//                           target.onerror = null;
//                         }}
//                       />
//                       <div className="absolute inset-x-0 bottom-0 bg-black/50 px-2 py-1">
//                         <p className="text-xs text-white truncate">
//                           {lp.title}
//                         </p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {hasNextPage && (
//                 <div className="flex justify-center mt-3">
//                   <button
//                     type="button"
//                     onClick={() => fetchNextPage()}
//                     disabled={isFetchingNextPage}
//                     className="px-4 py-1.5 rounded-full border text-sm bg-white hover:bg-gray-50 disabled:opacity-60"
//                   >
//                     {isFetchingNextPage ? "Loading..." : "Load more"}
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// src/components/SearchModal.tsx
import React, { useState, useMemo, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useInfiniteGetLpList } from "../hooks/useInfiniteGetLpList";
import { useDebounce } from "../hooks/useDebounce";
import type { LpItem } from "../types/lp";
import type { SortOrder } from "../types/common";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  // 사용자가 타이핑하는 원본 값
  const [query, setQuery] = useState("");

  // 300ms 디바운스된 검색어
  const debouncedQuery = useDebounce(query, 300);
  const trimmedQuery = debouncedQuery.trim();

  // 최신순 고정 (정의에 맞게 타입 맞춰 사용)
  const order: SortOrder = "desc";

  //  디바운스된 검색어를 search 로 넘기고,
  //  공백일 땐 enabled: false 로 요청 막기
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGetLpList({
    limit: 12,
    search: trimmedQuery,
    order: order as any,
    enabled: trimmedQuery.length > 0,
  });

  const lpItems: LpItem[] = useMemo(
    () => data?.pages.flatMap((page) => page.data.data || []) ?? [],
    [data]
  );

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // form submit 은 굳이 안 써도 되지만, 그냥 막기만
  };

  const handleResultClick = (id: number) => {
    onClose();
    navigate(`/lp/${id}`);
  };

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40"
      onClick={handleOverlayClick}
    >
      <div
        className="mt-20 w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 md:p-6 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            LP Search
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Search input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border bg-gray-50">
            🔍
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type keyword to search"
            className="flex-1 border-b border-gray-400 focus:outline-none focus:border-black text-base py-1 bg-transparent text-gray-900 placeholder-gray-400"
          />
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 border rounded-md text-sm text-gray-700 bg-gray-50"
          >
            Title
            <span className="text-xs">▼</span>
          </button>
        </form>

        {/* Results area */}
        <div className="flex-1 overflow-y-auto">
          {trimmedQuery.length === 0 && (
            <p className="text-sm text-gray-500">
              Enter a keyword and wait a moment to see the results.
            </p>
          )}

          {trimmedQuery.length > 0 && (
            <>
              {isPending && !isFetchingNextPage && (
                <p className="text-sm text-gray-500">Searching...</p>
              )}

              {isError && (
                <p className="text-sm text-red-500">
                  Error while searching: {(error as Error)?.message}
                </p>
              )}

              {!isPending && !isError && lpItems.length === 0 && (
                <p className="text-sm text-gray-500">
                  No results found for this keyword.
                </p>
              )}

              {lpItems.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {lpItems.map((lp) => (
                    <button
                      key={lp.id}
                      type="button"
                      onClick={() => handleResultClick(lp.id)}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
                    >
                      <img
                        src={lp.thumbnail}
                        alt={lp.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/500x500/e5e7eb/111827?text=DOLIGO";
                          target.onerror = null;
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/50 px-2 py-1">
                        <p className="text-xs text-white truncate">
                          {lp.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {hasNextPage && (
                <div className="flex justify-center mt-3">
                  <button
                    type="button"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-4 py-1.5 rounded-full border text-sm bg-white hover:bg-gray-50 disabled:opacity-60"
                  >
                    {isFetchingNextPage ? "Loading..." : "Load more"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

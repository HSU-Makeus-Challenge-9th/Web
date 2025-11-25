import { useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Header from "../../components/Header";
import SearchBar from "./components/searchBar";
import { useDebounce } from "../../hooks/useDebounce";
import LPCard from "../homePage/components/LPCard";
import { lpAPI } from "../../apis/apis";
import type { GetLPsResponse } from "../../apis/apis";

const SearchPage = () => {
    const [keyword, setKeyword] = useState("");
    const [instantKeyword, setInstantKeyword] = useState<string | null>(null);
    const debouncedKeyword = useDebounce(keyword, 300);

    useEffect(() => {
        if (instantKeyword && instantKeyword === debouncedKeyword) {
        setInstantKeyword(null);
        }
    }, [instantKeyword, debouncedKeyword]);

    const debouncedQuery = (instantKeyword ?? debouncedKeyword).trim();
    const isSearchReady = debouncedQuery.length > 0;

    const {
        data,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["search", debouncedQuery],
        enabled: isSearchReady,
        queryFn: async ({ pageParam }) => {
        const response: GetLPsResponse = await lpAPI.getLPs({
            cursor: pageParam ?? undefined,
            order: "desc",
            limit: 30,
            search: debouncedQuery,
        });
        if (response.status && response.data) {
            return response.data;
        }
        throw new Error("LP 목록을 불러올 수 없습니다.");
        },
        initialPageParam: undefined as number | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        retry: 2,
    });

    const lps = useMemo(
        () => data?.pages.flatMap((page) => page.data) ?? [],
        [data]
    );

    const handleManualSearch = () => {
        if (!keyword.trim()) return;
        setInstantKeyword(keyword.trim());
    };

    return (
        <>
        <Header />
        <div className="bg-black text-white min-h-screen pt-20 pb-20">
            <div className="flex flex-col items-center max-w-7xl mx-auto px-4 w-full space-y-10">
            <SearchBar
                keyword={keyword}
                onKeywordChange={setKeyword}
                onSearchClick={handleManualSearch}
                isSearching={isLoading}
            />

            {!isSearchReady && (
                <p className="text-gray-400 text-sm text-center">
                검색 키워드를 입력하면 결과가 표시됩니다.
                </p>
            )}

            {isSearchReady && isError && (
                <div className="text-red-400 text-center">
                {error instanceof Error
                    ? error.message
                    : "검색 중 오류가 발생했습니다."}
                </div>
            )}

            {isSearchReady && !isError && (
                <div className="w-full space-y-10">
                {isLoading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                        <div className="aspect-square bg-gray-800 rounded-lg mb-2"></div>
                        <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                        </div>
                    ))}
                    </div>
                )}

                {!isLoading && lps.length === 0 && (
                    <p className="text-gray-400 text-center">
                    일치하는 LP가 없습니다.
                    </p>
                )}

                {lps.length > 0 && (
                    <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {lps.map((lp) => (
                        <LPCard key={lp.id} lp={lp} onClick={() => {}} />
                        ))}
                    </div>
                    {isFetchingNextPage && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                            <div className="aspect-square bg-gray-800 rounded-lg mb-2"></div>
                            <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                            </div>
                        ))}
                        </div>
                    )}
                    </>
                )}
                </div>
            )}
            </div>
        </div>
        </>
    );
};

export default SearchPage;

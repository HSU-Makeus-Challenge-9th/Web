import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../apis/axios";
import type { LpDataType } from "../../types/lp";

export interface LpPage {
  data: LpDataType[];
  nextCursor?: number;
  hasNext?: boolean;
}

interface UseInfiniteSearchLpsProps {
  searchType: "title" | "tag";
  keyword: string;
  order: "asc" | "desc";
}

const fetchSearchLps = async ({
  pageParam = 0,
  searchType,
  keyword,
  order,
}: {
  pageParam: number;
  searchType: "title" | "tag";
  keyword: string;
  order: "asc" | "desc";
}) => {
  if (searchType === "tag") {
    const response = await axios.get(
      `/v1/lps/tag/${keyword}?cursor=${pageParam}&limit=12&order=${order}`
    );
    return response.data.data as LpPage;
  }

  const response = await axios.get(
    `/v1/lps?cursor=${pageParam}&limit=12&order=${order}&search=${keyword}`
  );
  return response.data.data as LpPage;
};

export const useInfiniteSearchLps = ({
  searchType,
  keyword,
  order,
}: UseInfiniteSearchLpsProps) => {
  const trimmedKeyword = keyword.trim();

  return useInfiniteQuery<LpPage, Error>({
    queryKey: ["searchLps", searchType, trimmedKeyword, order],

    queryFn: ({ pageParam = 0 }) =>
      fetchSearchLps({
        pageParam: pageParam as number,
        searchType,
        keyword: trimmedKeyword,
        order,
      }),

    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,

    enabled: !!trimmedKeyword,

    staleTime: 1000 * 60,
  });
};

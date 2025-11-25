import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../apis/axios";
import type { LpDataType } from "../../types/lp";

export interface LpPage {
  data: LpDataType[];
  nextCursor?: number;
  hasNext?: boolean;
}

interface UseInfiniteLpsProps {
  order: "asc" | "desc";
}

const fetchLps = async ({ pageParam = 0, order }: { pageParam: number; order: "asc" | "desc" }) => {
  const response = await axios.get(`/v1/lps?cursor=${pageParam}&limit=12&order=${order}`);
  return response.data.data;
};

export const useInfiniteLps = ({ order }: UseInfiniteLpsProps) => {
  return useInfiniteQuery<LpPage, Error>({
    queryKey: ["lps", order],
    queryFn: ({ pageParam }) => fetchLps({ pageParam: pageParam as number, order }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
  });
};


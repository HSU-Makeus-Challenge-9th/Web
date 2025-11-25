import { useQuery } from "@tanstack/react-query";
import axios from "../apis/axios";
import type { LpDataType } from "../types/lp";

interface SearchParams {
  searchType: "title" | "tag";
  keyword: string;
  order: "asc" | "desc";
  cursor?: number;
}

interface LpResponse {
  data: {
    data: LpDataType[];
    nextCursor: number | null;
    hasNext: boolean;
  };
}

export const useSearchLps = ({ searchType, keyword, order, cursor = 0 }: SearchParams) => {
  const queryKey = ["searchLps", searchType, keyword, order, cursor];

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (searchType === "tag") {
        const { data } = await axios.get<LpResponse>(`/v1/lps/tag/${keyword}`, {
          params: { cursor, order },
        });
        return data.data;
      } else {
        const { data } = await axios.get<LpResponse>("/v1/lps", {
          params: { cursor, search: keyword, order },
        });
        return data.data;
      }
    },
    enabled: !!keyword,
    staleTime: 1000 * 60,
  });
};

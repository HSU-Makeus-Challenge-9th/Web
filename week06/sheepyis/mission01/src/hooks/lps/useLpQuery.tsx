import { useQuery } from "@tanstack/react-query";
import { LpAPI } from "../../apis/lpAxios";
import type { LpResponse } from "../../types/lp/lp";

export const useLpQuery = (
  order: "asc" | "desc",
  cursor: number | null,
  limit: number
) => {
  return useQuery<LpResponse>({
    queryKey: ["lps", order, cursor],
    queryFn: () => LpAPI(order, cursor, limit),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

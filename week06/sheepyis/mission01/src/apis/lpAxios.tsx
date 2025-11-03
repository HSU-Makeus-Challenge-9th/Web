import { API } from "./axios";
import type { LpResponse } from "../types/lp/lp";

export const LpAPI = async (
  order: "asc" | "desc",
  cursor: number | null,
  limit: number
): Promise<LpResponse> => {
  const response = await API.get("lps", {
    params: { order, cursor, limit },
  });

  return {
    data: response.data.data.data,
    nextCursor: response.data.data.nextCursor,
    hasNext: response.data.data.hasNext,
  };
};

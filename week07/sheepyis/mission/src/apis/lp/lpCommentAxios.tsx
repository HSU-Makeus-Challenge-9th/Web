import { API } from "../axios";
import type { CommentResponse } from "../../types/lp/comment";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const LpCommentAPI = async (
  lpId: number,
  cursor: number | null,
  limit: number,
  order: "asc" | "desc" = "asc"
): Promise<CommentResponse> => {
  const res = await API.get(`lps/${lpId}/comments`, {
    params: {
      cursor,
      limit,
      order,
    },
  });

  await delay(500);

  return res.data.data;
};

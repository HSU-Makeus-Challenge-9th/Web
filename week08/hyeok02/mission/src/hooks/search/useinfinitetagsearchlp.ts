import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../apis/axios";
import type { LpDataType } from "../../types/lp";

export interface LpPage {
  data: LpDataType[];
  nextCursor?: number;
  hasNext?: boolean;
}

interface UseInfiniteTagSearchLpsProps {
  tagName: string;
  order: "asc" | "desc";
}

const fetchTagLps = async ({
  pageParam = 0,
  tagName,
  order,
}: {
  pageParam: number;
  tagName: string;
  order: "asc" | "desc";
}) => {
  const response = await axios.get(
    `/v1/lps/tag/${tagName}?cursor=${pageParam}&limit=12&order=${order}`
  );
  return response.data.data as LpPage;
};

export const useInfiniteTagSearchLps = ({
  tagName,
  order,
}: UseInfiniteTagSearchLpsProps) => {
  const trimmedTagName = tagName.trim();

  return useInfiniteQuery<LpPage, Error>({
    queryKey: ["tagLps", trimmedTagName, order],
    queryFn: ({ pageParam = 0 }) =>
      fetchTagLps({
        pageParam: pageParam as number,
        tagName: trimmedTagName,
        order,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,

    enabled: !!trimmedTagName,

    staleTime: 1000 * 60,
  });
};

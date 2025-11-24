// src/hooks/useLps.ts

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { AxiosResponse } from "axios";
import { Api } from "../api/authApi";
import type { LpQueryParams, LpApiFullResponse } from "../types/lp";

// --- API 함수 (Axios 사용) ---
const fetchLps = async (params: LpQueryParams): Promise<LpApiFullResponse> => {
  const url = "/v1/lps";

  try {
    const response: AxiosResponse<LpApiFullResponse> = await Api.get(url, {
      params,
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("LP 목록 조회에 실패했습니다.");
  }
};

// --- 커스텀 훅 ---
export const useLps = () => {
  const [queryParams, setQueryParams] = useState<LpQueryParams>({
    cursor: 0,
    limit: 30,
    order: "desc", // 초기값: 최신순 (desc)
  });

  const toggleOrder = () => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      order: prevParams.order === "desc" ? "asc" : "desc",
    }));
  };

  const queryResult = useQuery({
    queryKey: ["lps", queryParams.order, queryParams.limit],
    queryFn: () => fetchLps(queryParams),

    select: (apiResponse) => {
      return apiResponse.data.data;
    },

    staleTime: 1000 * 30, // 30초 동안 fresh 유지
    gcTime: 1000 * 60 * 5, // 5분 후 캐시 삭제
  });

  return {
    ...queryResult,
    queryParams,
    toggleOrder,
  };
};

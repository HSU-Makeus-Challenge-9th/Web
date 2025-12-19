// src/hooks/useLpDetail.ts

import { useQuery } from "@tanstack/react-query";

import type { AxiosResponse } from "axios";
import { Api } from "../api/authApi";
import type { LpDetailFullResponse } from "../types/lp";

// --- API 함수 ---
const fetchLpDetail = async (lpId: string): Promise<LpDetailFullResponse> => {
  const url = `/v1/lps/${lpId}`; // 💡 URL 경로 파라미터 사용

  try {
    const response: AxiosResponse<LpDetailFullResponse> = await Api.get(url);

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error(`LP ID ${lpId} 상세 정보를 불러오지 못했습니다.`);
  }
};

// --- 커스텀 훅 ---
export const useLpDetail = (lpId: string | undefined) => {
  const enabled = !!lpId;

  return useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: () => fetchLpDetail(lpId!),
    enabled,

    select: (apiResponse) => {
      return apiResponse.data;
    },

    staleTime: 1000 * 60 * 30, // 30분 동안 fresh 유지
    gcTime: 1000 * 60 * 60, // 1시간 후 캐시 삭제
  });
};

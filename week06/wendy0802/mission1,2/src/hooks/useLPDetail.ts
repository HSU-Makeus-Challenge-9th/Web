import { useQuery } from "@tanstack/react-query";
import { lpAPI } from "../apis/apis";

export const useLPDetail = (lpId: number | null, enabled: boolean) => {
  return useQuery({
    queryKey: ["lp", lpId],
    queryFn: async () => {
      if (!lpId) throw new Error("유효하지 않은 LP ID입니다.");
      const res = await lpAPI.getLPDetail(lpId);
      if (res.status) return res.data;
      const message =
        typeof (res as unknown as { message?: string }).message === "string"
          ? (res as unknown as { message: string }).message
          : "LP 상세 조회 실패";
      throw new Error(message);
    },
    enabled: enabled && lpId !== null,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

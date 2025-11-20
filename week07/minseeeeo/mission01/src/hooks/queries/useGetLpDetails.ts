import { useQuery } from "@tanstack/react-query";
import { getLpDetails } from "../../apis/lp";
import { QUERY_KEY2 } from "../../constants/key";

function useGetLpDetails(id: number) {
  return useQuery({
    queryKey: [QUERY_KEY2.lp, id],
    queryFn: () => getLpDetails(id),

    staleTime: 5 * 60 * 1_000, // 5분
    gcTime: 10 * 60 * 1_000, // 10분
    refetchInterval: 10 * 60 * 1_000, // 10분
  });
}

export default useGetLpDetails;

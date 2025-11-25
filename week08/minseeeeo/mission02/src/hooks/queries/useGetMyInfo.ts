import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";

function useGetMyInfo() {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: () => getMyInfo(),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

export default useGetMyInfo;

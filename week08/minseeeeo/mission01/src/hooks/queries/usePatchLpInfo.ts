import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLpInfo } from "../../apis/lp";
import type { RequestPatchLpDto } from "../../types/lp";
import { QUERY_KEY2 } from "../../constants/key";

function usePatchLpInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lpId,
      lpItem,
    }: {
      lpId: number;
      lpItem: RequestPatchLpDto;
    }) => patchLpInfo(lpId, lpItem),

    onSuccess: () => {
      console.log("LP정보 업데이트 성공");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY2.lp] });
    },
    onError: (error) => {
      console.log("LP정보 업데이트중, 오류 발생", error);
    },
  });
}

export default usePatchLpInfo;

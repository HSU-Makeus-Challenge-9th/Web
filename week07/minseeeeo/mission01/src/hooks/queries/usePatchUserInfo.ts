import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUserInfo } from "../../apis/lp";
import type { RequestPatchUserInfo } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";

function usePatchUserInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userItem: RequestPatchUserInfo) => patchUserInfo(userItem),

    onSuccess: () => {
      console.log("유저정보 수정 성공");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments] });
    },
    onError: () => {
      console.log("유저 정보를 수정하는 도중, 오류가 발생하였습니다.");
    },
  });
}

export default usePatchUserInfo;

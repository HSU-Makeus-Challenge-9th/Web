import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUserInfo } from "../../apis/lp";
import type { RequestPatchUserInfo } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePatchUserInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userItem: RequestPatchUserInfo) => patchUserInfo(userItem),

    // Optimistic Update: 서버 응답 전에 UI 즉시 업데이트
    onMutate: async (newUserInfo) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      // 이전 값 저장 (롤백용)
      const previousUserInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      // 새로운 값으로 즉시 업데이트
      if (previousUserInfo) {
        queryClient.setQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo], {
          ...previousUserInfo,
          data: {
            ...previousUserInfo.data,
            name: newUserInfo.name,
            bio: newUserInfo.bio,
            avatar: newUserInfo.avatar,
          },
        });
      }

      // 롤백을 위해 이전 값 반환
      return { previousUserInfo };
    },

    onSuccess: () => {
      console.log("유저정보 수정 성공");
      // 성공 시 서버 데이터로 최종 동기화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments] });
    },

    onError: (error, newUserInfo, context) => {
      console.log("유저 정보를 수정하는 도중, 오류가 발생하였습니다.");
      // 에러 발생 시 이전 값으로 롤백
      if (context?.previousUserInfo) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousUserInfo);
      }
    },
  });
}

export default usePatchUserInfo;

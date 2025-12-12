import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { QUERY_KEY2 } from "../../constants/key";
import type { ResponseLpDetailsDto } from "../../types/lp";

function useDeleteLike(lpId: number, currentUserId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteLike(lpId),

    // Optimistic Update: 서버 응답 전에 UI 즉시 업데이트
    onMutate: async () => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY2.lp, lpId] });

      // 이전 값 저장 (롤백용)
      const previousLpDetails = queryClient.getQueryData<ResponseLpDetailsDto>([
        QUERY_KEY2.lp,
        lpId,
      ]);

      // 새로운 값으로 즉시 업데이트 (좋아요 제거)
      if (previousLpDetails && currentUserId) {
        queryClient.setQueryData<ResponseLpDetailsDto>([QUERY_KEY2.lp, lpId], {
          ...previousLpDetails,
          data: {
            ...previousLpDetails.data,
            likes: previousLpDetails.data.likes.filter(
              (like) => like.userId !== currentUserId
            ),
          },
        });
      }

      return { previousLpDetails };
    },

    onSuccess: () => {
      console.log("좋아요 취소 성공");
      // 성공 시 서버 데이터로 최종 동기화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY2.lp, lpId] });
    },

    onError: (error, _variables, context) => {
      console.log("좋아요 취소 과정중, 오류 발생", error);
      // 에러 발생 시 이전 값으로 롤백
      if (context?.previousLpDetails) {
        queryClient.setQueryData(
          [QUERY_KEY2.lp, lpId],
          context.previousLpDetails
        );
      }
    },
  });
}

export default useDeleteLike;

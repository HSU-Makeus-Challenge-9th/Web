import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import type { ResponseMyInfoDto } from "../../types/auth";

export const usePatchMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ResponseMyInfoDto,
    Error,
    { name: string; bio: string; avatar: string },
    { previousData?: ResponseMyInfoDto }
  >({
    mutationFn: (updateData) => patchMyInfo(updateData),

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["myInfo"] });

      const previousData = queryClient.getQueryData<ResponseMyInfoDto>([
        "myInfo",
      ]);

      queryClient.setQueryData<ResponseMyInfoDto>(["myInfo"], (old) => {
        if (!old) return old as any;
        return {
          ...old,
          data: {
            ...old.data,
            name: newData.name ?? old.data.name,
            bio: newData.bio ?? old.data.bio,
            avatar: newData.avatar ?? old.data.avatar,
          },
        };
      });

      return { previousData };
    },

    onError: (err, newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["myInfo"], context.previousData);
      }
      alert("프로필 수정 중 오류가 발생했습니다.");
    },

    onSuccess: (res) => {
      queryClient.setQueryData(["myInfo"], res);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
};

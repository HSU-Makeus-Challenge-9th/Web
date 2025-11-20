import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import type { EditUserPayload } from "../../types/auth/auth";
import { useAuth } from "../../context/auth/AuthContext";

export const useEditUserMutation = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async (payload: EditUserPayload) => {
      const res = await API.patch("users", payload);
      return res.data;
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });

      const prevUser = queryClient.getQueryData(["user"]);

      queryClient.setQueryData(["user"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          name: payload.name ?? old.name,
          bio: payload.bio ?? old.bio,
          avatar: payload.avatar ?? old.avatar,
        };
      });

      setAuth({
        accessToken: localStorage.getItem("accessToken") ?? "",
        refreshToken: localStorage.getItem("refreshToken") ?? "",
        name: payload.name ?? "",
      });

      return { prevUser };
    },

    onError: (error, _, context) => {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정에 실패했습니다.");

      if (context?.prevUser) {
        queryClient.setQueryData(["user"], context.prevUser);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

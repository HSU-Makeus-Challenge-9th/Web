import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import type { AddLpPayload } from "../../types/lp/add";

export const useAddMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLp: AddLpPayload) => {
      const res = await API.post("lps", newLp);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      onClose();
    },
    onError: (error) => {
      console.error("LP 생성 실패:", error);
      alert("LP 생성에 실패했습니다. 다시 시도해주세요.");
    },
  });
};

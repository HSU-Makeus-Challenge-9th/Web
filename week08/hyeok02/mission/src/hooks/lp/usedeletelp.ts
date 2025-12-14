import { useMutation } from "@tanstack/react-query";
import axios from "../../apis/axios";

export const useDeleteLp = (lpid: number) => {
  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`/v1/lps/${lpid}`);
      return res.data;
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import axios from "../apis/axios";

export const useUnlikeLp = (lpid: number) => {
  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`/v1/lps/${lpid}/likes`);
      return res.data;
    },
  });
};

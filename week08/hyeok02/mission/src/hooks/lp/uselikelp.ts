import { useMutation } from "@tanstack/react-query";
import axios from "../../apis/axios";

export const useLikeLp = (lpid: number) => {
  return useMutation({
    mutationFn: async () => {
      const res = await axios.post(`/v1/lps/${lpid}/likes`);
      return res.data;
    },
  });
};

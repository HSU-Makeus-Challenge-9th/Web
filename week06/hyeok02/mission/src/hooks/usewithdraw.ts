import { useMutation } from "@tanstack/react-query";
import axios from "../apis/axios";

export const useWithdrawUser = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete("/v1/users");
      return res.data;
    },
  });
};

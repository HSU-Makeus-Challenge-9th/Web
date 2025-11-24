import { useMutation } from "@tanstack/react-query";
import axios from "../apis/axios";
import { LpDetailUpdateType } from "../types/lp"; 

export const useEditLp = (lpid: number) => {
  return useMutation({
    mutationFn: async (payload: LpDetailUpdateType) => {  
      const res = await axios.patch(`/v1/lps/${lpid}`, payload);
      return res.data;
    },
  });
};

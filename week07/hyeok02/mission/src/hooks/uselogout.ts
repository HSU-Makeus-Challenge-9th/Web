import { useMutation } from "@tanstack/react-query";
import axios from "../apis/axios";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await axios.post("/v1/auth/signout"); 
    },
  });
};

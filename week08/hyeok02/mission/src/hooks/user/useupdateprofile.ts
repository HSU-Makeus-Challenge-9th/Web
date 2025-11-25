import { useMutation } from "@tanstack/react-query";
import axios from "../../apis/axios";

export interface UpdateUserProfilePayload {
  name: string;
  bio: string;
  avatar: string;
}

export const useUpdateUserProfile = () => {
    return useMutation({
      mutationFn: async (payload: UpdateUserProfilePayload) => {
        const response = await axios.patch("/v1/users", payload);
        return response.data;
      },
      onMutate: async (payload) => {
        localStorage.setItem("nickname", payload.name);
        window.dispatchEvent(new Event("storage"));  
      },
    });
  };
  
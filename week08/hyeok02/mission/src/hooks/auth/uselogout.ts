import { useMutation } from "@tanstack/react-query";
import axios from "../../apis/axios";
import { useNavigate } from "react-router-dom";

export const useLogout = (onSuccessCallback?: () => void) => {
  const navigate = useNavigate();

  const clearStorageAndRedirect = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    sessionStorage.removeItem("refreshToken");
    if (onSuccessCallback) onSuccessCallback();
    navigate("/");
  };

  return useMutation({
    mutationFn: async () => {
      await axios.post("/v1/auth/signout");
    },
    onSuccess: clearStorageAndRedirect,
    onError: clearStorageAndRedirect, 
  });
};

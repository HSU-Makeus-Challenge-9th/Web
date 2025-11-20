import { useMutation } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import type { UploadResponse } from "../../types/common/upload";

export const useUploadMutation = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await API.post<UploadResponse>("uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.data.imageUrl;
    },
    onError: (error) => {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    },
  });
};

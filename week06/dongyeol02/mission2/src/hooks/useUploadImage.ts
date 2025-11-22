// src/hooks/useUploadImage.ts

import { useMutation } from "@tanstack/react-query";

import type { AxiosResponse } from "axios";
import { Api } from "../api/authApi";

// --- 타입 정의 ---

interface UploadResponse {
  imageUrl: string;
}

const uploadImage = async (file: File): Promise<string> => {
  const url = "/v1/images"; // 이미지 업로드 엔드포인트 가정

  const formData = new FormData();
  formData.append("file", file); // 서버에서 'file'이라는 필드 이름으로 파일을 기대한다고 가정

  try {
    const response: AxiosResponse<UploadResponse> = await Api.post(
      url,
      formData
    );

    // 성공 시 서버가 준 imageUrl만 반환합니다.
    return response.data.imageUrl;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("이미지 업로드에 실패했습니다. 파일 크기를 확인해주세요.");
  }
};

// --- 커스텀 훅 ---
export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
  });
};

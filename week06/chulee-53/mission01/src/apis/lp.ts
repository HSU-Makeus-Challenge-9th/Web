import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  PaginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: PaginationDto,
  });

  return data;
};

export const getLpDetail = async (lpId: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

export const createLp = async (body: {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}) => {
  const { data } = await axiosInstance.post("/v1/lps", body);
  return data;
};

export const deleteLp = async (lpId: number) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};


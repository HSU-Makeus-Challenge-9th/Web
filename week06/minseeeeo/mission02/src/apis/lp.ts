import type { CommentPaginationDto, PagenationDto } from "../types/common";
import type {
  ResponseLpCommentsDto,
  ResponseLpDetailsDto,
  ResponseLpListDto,
} from "../types/lp";
import axiosInstance from "./axios";

export const getLpList = async (
  paginationDto: PagenationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

export const getLpDetails = async (
  id: number
): Promise<ResponseLpDetailsDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`, {
    params: { id },
  });
  return data;
};

export const getLpComments = async (
  paginationDto: CommentPaginationDto
): Promise<ResponseLpCommentsDto> => {
  const { data } = await axiosInstance.get(
    `/v1/lps/${paginationDto.lpId}/comments`,
    {
      params: { ...paginationDto },
    }
  );
  return data;
};

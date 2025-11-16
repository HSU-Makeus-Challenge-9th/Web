import { axiosInstance } from "./axios";
import type { PaginationDto } from "../types/common";
import type {
  ResponseLpListDto,
  ResponseLpDetailDto,
  ResponseDeleteLpDto,
  CreateLpDto,
  UpdateLpDto,
} from "../types/lp";

const LP_API_PREFIX = "/v1/lps";

/**
 * [GET] Lp 목록 조회 (전체, 페이지네이션)
 */
export const getLpList = async (
  paginationDto: PaginationDto = {} // 기본값 설정
): Promise<ResponseLpListDto> => {
  // paginationDto에는 order (asc/desc), limit, cursor 등이 포함됩니다.
  const { data } = await axiosInstance.get(LP_API_PREFIX, {
    params: paginationDto,
  });
  return data;
};

/**
 * [GET] 특정 유저의 Lp 목록 조회
 */
export const getLpListByUser = async (
  userId: number,
  paginationDto: PaginationDto = {}
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get(`${LP_API_PREFIX}/user/${userId}`, {
    params: paginationDto,
  });
  return data;
};

/**
 * [GET] 내 Lp 목록 조회
 */
export const getMyLpList = async (
  paginationDto: PaginationDto = {}
): Promise<ResponseLpListDto> => {
  // 인증이 필요하므로 axiosInstance가 토큰을 자동으로 붙여야 함
  const { data } = await axiosInstance.get(`${LP_API_PREFIX}/user`, {
    params: paginationDto,
  });
  return data;
};

/**
 * [GET] Lp 상세 정보 조회
 */
export const getLpDetail = async (
  lpId: number
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`${LP_API_PREFIX}/${lpId}`);
  return data;
};

/**
 * [POST] 새로운 Lp 생성
 */
export const createLp = async (
  lpData: CreateLpDto
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.post(LP_API_PREFIX, lpData);
  return data;
};

/**
 * [PATCH] 특정 Lp의 정보를 업데이트합니다.
 */
export const updateLp = async (
  lpId: number,
  lpData: UpdateLpDto
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.patch(
    `${LP_API_PREFIX}/${lpId}`,
    lpData
  );
  return data;
};

/**
 * [DELETE] 특정 Lp 삭제
 */
export const deleteLp = async (lpId: number): Promise<ResponseDeleteLpDto> => {
  const { data } = await axiosInstance.delete(`${LP_API_PREFIX}/${lpId}`);
  return data;
};

// lpId, cursor, limit 등을 사용하여 댓글을 가져와야 합니다.

export const getLpComments = async (
  lpId: number,
  accessToken: string | null,
  queryOptions?: { limit?: number; cursor?: number }
) => {
  const url = `/v1/lps/${lpId}/comments`;

  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  const { data } = await axiosInstance.get(url, {
    headers,
    params: queryOptions,
  });

  return data;
};

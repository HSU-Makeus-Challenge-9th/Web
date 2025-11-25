import type { CommentPaginationDto, PagenationDto } from "../types/common";
import type {
  RequestLpPostDto,
  RequestPatchLpDto,
  RequestPatchUserInfo,
  ResponseDeleteLpCommentDto,
  ResponseDeleteLpDto,
  ResponseLikeDto,
  ResponseLpCommentsDto,
  ResponseLpDetailsDto,
  ResponseLpListDto,
  ResponseLpListTagNameDto,
  ResponseLpPostDto,
  ResponsePatchLpCommentDto,
  ResponsePatchLpInfo,
  ResponsePatchUserInfo,
  ResponsePostLpCommentDto,
} from "../types/lp";
import axiosInstance from "./axios";

// (GET) /v1/lps
export const getLpList = async (
  paginationDto: PagenationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

// (GET) /v1/lps/:id
export const getLpDetails = async (
  id: number
): Promise<ResponseLpDetailsDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`, {
    params: { id },
  });
  return data;
};

// (GET) /v1/lps/:id/comments
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

// (POST) /v1/lps
export const postLp = async (
  lpContent: RequestLpPostDto
): Promise<ResponseLpPostDto> => {
  const { data } = await axiosInstance.post("/v1/lps", lpContent);
  return data;
};

// (POST) /v1/lps/:id/comments
export const postLpComment = async (
  lpId: number,
  content: string
): Promise<ResponsePostLpCommentDto> => {
  const { data } = await axiosInstance.post(
    `/v1/lps/${lpId}/comments`,
    {
      content,
    },
    {
      params: { lpId },
    }
  );
  return data;
};

// (PATCH) /v1/lps/:lpId/comments/:commentId
export const patchLpComment = async (
  lpId: number,
  commentId: number,
  content: string
): Promise<ResponsePatchLpCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content },
    {
      params: { lpId, commentId },
    }
  );
  return data;
};

// (DELETE) /v1/lps/:lpId/comments/:commentId
export const deleteLpComment = async (
  lpId: number,
  commentId: number
): Promise<ResponseDeleteLpCommentDto> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { params: { lpId, commentId } }
  );
  return data;
};

// (PATCH) /v1/users
export const patchUserInfo = async (
  userInfo: RequestPatchUserInfo
): Promise<ResponsePatchUserInfo> => {
  const { data } = await axiosInstance.patch("/v1/users", userInfo);
  return data;
};

// (DELETE) /v1/users
export const deleteUser = async () => {
  const { data } = await axiosInstance.delete("/v1/users");
  return data;
};

// (DELETE) /v1/lps/:id
export const deleteLp = async (id: number): Promise<ResponseDeleteLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${id}`);
  return data;
};

// (PATCH) /v1/lps/:id
export const patchLpInfo = async (
  lpId: number,
  lpItem: RequestPatchLpDto
): Promise<ResponsePatchLpInfo> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, lpItem);
  return data;
};

// (POST) /v1/lps/:lpId/likes
export const postLike = async (lpId: number): Promise<ResponseLikeDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

// (DELETE) /v1/lps/:lpId/likes
export const deleteLike = async (lpId: number): Promise<ResponseLikeDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};

// (GET) /v1/lps/tag/:tagName
export const getTagNameLpList = async (
  tagName: string,
  pagination: PagenationDto
): Promise<ResponseLpListTagNameDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/tag/${tagName}`, {
    params: pagination,
  });
  return data;
};

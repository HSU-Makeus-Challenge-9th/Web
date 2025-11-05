import { API, PrivateAPI } from './axios';
import type { GetLpsParams, Lp, LpDetailResponse } from '../types/lp';

//lp 목록 조회
export const getLps = async (params: GetLpsParams) => {
  const { data } = await API.get('/lps', { params });
  return data.data;
};

//lp 상세 정보 조회
export const getLpDetail = async (lpId: number): Promise<Lp> => {
  const response = await PrivateAPI.get<LpDetailResponse>(`/lps/${lpId}`);
  return response.data.data;
};

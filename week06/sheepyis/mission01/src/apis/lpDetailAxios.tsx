import { API } from "./axios";

export const LPDetailAPI = async (id: string | undefined) => {
  const response = await API.get(`lps/${id}`);
  return response.data.data;
};

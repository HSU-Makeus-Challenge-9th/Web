import axios from "axios";
import { loadAuth, saveAuth, clearAuth } from "../utils/auth/authStorage";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({
  baseURL,
  headers: { accept: "application/json" },
});

API.interceptors.request.use((config) => {
  const { accessToken } = loadAuth();
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest: any = error.config;
    if (!error.response) return Promise.reject(error);
    if (originalRequest._retry) return Promise.reject(error);

    if (error.response.status !== 401) {
      console.log("401 발생: 리프레시 시도");
      return Promise.reject(error);
    }

    const reqUrl = new URL(originalRequest.url ?? "", baseURL).pathname;

    const publicPaths = new Set<string>([
      "/v1/auth/signin",
      "/v1/auth/signup",
      "/v1/auth/refresh",
      "/v1/auth/google/login",
      "/v1/auth/google/callback",
    ]);
    if (publicPaths.has(reqUrl)) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const { refreshToken, name } = loadAuth();
      if (!refreshToken) throw new Error("리프레시 토큰이 없습니다.");

      const refreshRes = await axios.post(`${baseURL}auth/refresh`, {
        refresh: refreshToken,
      });

      const newAccessToken = refreshRes?.data?.data?.accessToken;
      const newRefreshToken =
        refreshRes?.data?.data?.refreshToken || refreshToken;

      if (!newAccessToken) throw new Error("새 accessToken이 없습니다.");

      saveAuth({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        name: name ?? undefined,
      });

      // console.log("토큰 재발급 성공");

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      const retryRes = await API(originalRequest);
      // console.log("재요청 성공:", originalRequest.url);
      return retryRes;
    } catch (e) {
      clearAuth();
      setTimeout(() => {
        window.alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
      }, 0);
      return Promise.reject(e);
    }
  }
);

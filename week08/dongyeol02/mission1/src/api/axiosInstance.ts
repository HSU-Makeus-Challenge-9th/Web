import axios from "axios";
import { Api } from "./authApi";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const cleanToken = refreshToken?.replace(/^"|"$/g, "");
        console.log("리프레시 토큰 발급");
        const res = await Api.post("/v1/auth/refresh", {
          refresh: cleanToken,
        });
        console.log("리프레시 요청 결과:", res.data);
        const newAccessToken = res.data.data.accessToken;
        console.log("새 액세스 토큰 발급성공");
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("토큰 갱신 실패:", err);
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

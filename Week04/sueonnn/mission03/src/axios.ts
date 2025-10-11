// src/axios.ts 파일 내용

import axios, { AxiosError } from "axios";
import { LOCAL_STORAGE_KEY } from "./constants/constants";
import { getLocalStorageToken } from "./hooks/useLocalStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorageToken(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

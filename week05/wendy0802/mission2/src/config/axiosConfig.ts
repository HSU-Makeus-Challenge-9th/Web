import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: Error | AxiosError) => void;
}

const instance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const refreshInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const processQueue = (
  error: Error | AxiosError | null = null,
  token: string | null = null
): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
};

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const { status } = error.response || {};

    if (status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
          }
          return instance(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("nickname");
      window.location.href = `/login`;
      isRefreshing = false;
      return Promise.reject(error);
    }
    try {
      const res = await refreshInstance.post("/v1/auth/refresh", {
        refreshToken: refreshToken,
      });

      const newAccessToken = res.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      isRefreshing = false;
      processQueue(null, newAccessToken);

      if (originalRequest.headers) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      }

      return instance(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      processQueue(refreshError as AxiosError, null);

      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      localStorage.removeItem("nickname");

      if (window.location.pathname !== "/login") {
        alert("로그인 세션 만료");
        window.location.href = "/login";
      }

      return Promise.reject(refreshError);
    }
  }
);

export default instance;

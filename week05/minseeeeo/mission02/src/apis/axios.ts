import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 대기 중인 요청들을 저장하는 큐
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

// 대기 중인 요청들을 처리하는 함수
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });

  failedQueue = [];
};

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("=== 요청 인터셉터 실행 ===");
    // localStorage에서 직접 가져오기
    const rawToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    if (rawToken) {
      let token = rawToken;

      // JSON.stringify로 저장된 경우 파싱
      if (rawToken.startsWith('"') && rawToken.endsWith('"')) {
        try {
          token = JSON.parse(rawToken);
        } catch (e) {
          console.error("JSON 파싱 실패:", e);
        }
      }

      // Authorization 헤더 설정
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("요청 인터셉터 에러 발생:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("401 에러 발생");

      // 로그인/회원가입/토큰갱신 요청인 경우는 토큰 갱신 시도하지 않음
      if (
        originalRequest.url?.includes("/auth/signin") ||
        originalRequest.url?.includes("/auth/signup") ||
        originalRequest.url?.includes("/auth/refresh")
      ) {
        return Promise.reject(error);
      }

      // 이미 토큰 갱신 중인 경우
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);

      if (!refreshToken) {
        console.error("Refresh Token이 없습니다.");
        isRefreshing = false;
        processQueue(error, null);

        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }

      try {
        let parsedRefreshToken = refreshToken;
        if (refreshToken.startsWith('"') && refreshToken.endsWith('"')) {
          parsedRefreshToken = JSON.parse(refreshToken);
        }

        console.log("토큰 갱신 시도...");
        console.log(
          "Refresh Token:",
          parsedRefreshToken.substring(0, 20) + "..."
        );

        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_API_URL}/v1/auth/refresh`,
          {
            refreshToken: parsedRefreshToken,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;

        localStorage.setItem(
          LOCAL_STORAGE_KEY.accessToken,
          JSON.stringify(accessToken)
        );

        if (newRefreshToken) {
          localStorage.setItem(
            LOCAL_STORAGE_KEY.refreshToken,
            JSON.stringify(newRefreshToken)
          );
        }

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        isRefreshing = false;

        return axiosInstance(originalRequest);
      } catch (refreshError: unknown) {
        processQueue(refreshError, null);
        isRefreshing = false;

        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

        if (!window.location.pathname.includes("/login")) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 404) {
      console.error("🔍 404 에러 - API 경로를 확인하세요!");
      console.log(error.config?.url);
      console.log(error.config?.baseURL);
    }

    return Promise.reject(error);
  }
);

// TypeScript 타입 확장
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

export default axiosInstance;

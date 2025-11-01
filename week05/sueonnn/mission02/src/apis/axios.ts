import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";

import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "../utils/localStorage";

// ====================================================================
// 1. 타입 및 전역 변수 정의
// ====================================================================

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;
const REFRESH_ENDPOINT = "/v1/auth/refresh";

// 메인 Axios 인스턴스
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// Refresh 전용 Axios 인스턴스 (인터셉터 없음)
const refreshAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// ====================================================================
// 2. 요청 인터셉터 (메인 인스턴스에만 적용)
// ====================================================================
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    console.log("🚨 [DEBUG 1] Request:", {
      url: config.url,
      method: config.method,
      hasToken: !!accessToken,
      tokenPreview: accessToken
        ? accessToken.substring(0, 20) + "..."
        : "NO TOKEN",
    });

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("🚨 [DEBUG] Request Error:", error);
    return Promise.reject(error);
  }
);

// ====================================================================
// 3. 응답 인터셉터 (메인 인스턴스에만 적용)
// ====================================================================
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("✅ [DEBUG] Response Success:", {
      url: response.config.url,
      status: response.status,
    });
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    console.error("❌ [DEBUG 2] Response Error:", {
      url: originalRequest?.url,
      status: error.response?.status,
      message: error.message,
      hasOriginalRequest: !!originalRequest,
    });

    // 401이 아니거나 원본 요청이 없으면 에러 반환
    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    // 이미 재시도된 요청이면 에러 반환
    if (originalRequest._retry) {
      console.error("🚨 [DEBUG 3] Already retried, failing request");
      return Promise.reject(error);
    }

    console.log("🚨 [DEBUG 4] 401 Unauthorized - Starting token refresh");
    originalRequest._retry = true;

    // 리프레시 토큰 확인
    const currentRefreshToken = getRefreshToken();
    console.log("🚨 [DEBUG 5] Current Refresh Token:", {
      exists: !!currentRefreshToken,
      preview: currentRefreshToken
        ? currentRefreshToken.substring(0, 20) + "..."
        : "NO TOKEN",
    });

    if (!currentRefreshToken) {
      console.error("🚨 [DEBUG 6] No refresh token, redirecting to login");
      removeAccessToken();
      removeRefreshToken();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // 중복 리프레시 방지
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          console.log("🚨 [DEBUG 7] Sending refresh request");

          // refreshAxios 사용 (인터셉터 없는 인스턴스)
          const response = await refreshAxios.post(REFRESH_ENDPOINT, {
            refresh: currentRefreshToken,
          });

          console.log("🚨 [DEBUG 8] Refresh response:", {
            status: response.status,
            hasData: !!response.data?.data,
            hasAccessToken: !!response.data?.data?.accessToken,
            hasRefreshToken: !!response.data?.data?.refreshToken,
          });

          const { accessToken, refreshToken } = response.data.data;

          // 새 토큰 저장
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);

          console.log("✅ [DEBUG 9] New tokens saved successfully");
          return accessToken;
        } catch (refreshError: any) {
          console.error("❌ [DEBUG 10] Refresh failed:", {
            status: refreshError.response?.status,
            message: refreshError.message,
            data: refreshError.response?.data,
          });

          // 리프레시 실패 시 로그아웃
          removeAccessToken();
          removeRefreshToken();
          window.location.href = "/login";
          throw refreshError;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    try {
      const newAccessToken = await refreshPromise;
      console.log("🚨 [DEBUG 11] Retrying original request with new token");

      // 원본 요청에 새 토큰 적용
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance.request(originalRequest);
    } catch (retryError) {
      console.error("❌ [DEBUG 12] Retry failed:", retryError);
      return Promise.reject(retryError);
    }
  }
);

// ====================================================================
// 4. 디버깅 헬퍼 함수 (개발 환경에서만 사용)
// ====================================================================
export const debugTokens = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  console.log("🔍 Current Tokens:", {
    accessToken: {
      exists: !!accessToken,
      preview: accessToken ? accessToken.substring(0, 30) + "..." : "NO TOKEN",
      fullLength: accessToken?.length || 0,
    },
    refreshToken: {
      exists: !!refreshToken,
      preview: refreshToken
        ? refreshToken.substring(0, 30) + "..."
        : "NO TOKEN",
      fullLength: refreshToken?.length || 0,
    },
  });
};

// 개발 환경에서 전역으로 사용할 수 있게 노출
if (import.meta.env.DEV) {
  (window as any).debugTokens = debugTokens;
}

import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // localStorage에서 직접 가져오기 (useLocalStorage 거치지 않음)
    const rawToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    console.log("=== Request Interceptor ===");
    console.log("1. localStorage 원본:", rawToken);
    console.log("2. URL:", config.url);

    if (rawToken) {
      let token = rawToken;

      // JSON.stringify로 저장된 경우 파싱
      if (rawToken.startsWith('"') && rawToken.endsWith('"')) {
        try {
          token = JSON.parse(rawToken);
          console.log("3. JSON 파싱 후:", token);
        } catch (e) {
          console.error("JSON 파싱 실패:", e);
        }
      }

      // Authorization 헤더 설정
      config.headers.Authorization = `Bearer ${token}`;
      console.log("4. Authorization:", config.headers.Authorization);

      // JWT 검증 (디버깅용)
      try {
        const parts = token.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          console.log(
            "5. 토큰 사용자:",
            payload.email || payload.sub || payload.id
          );
          console.log("6. 토큰 만료:", new Date(payload.exp * 1000));
        } else {
          console.error("❌ 잘못된 JWT 형식 (parts:", parts.length, ")");
        }
      } catch (e) {
        console.error("JWT 디코딩 실패:", e);
      }
    } else {
      console.warn("⚠️ 토큰이 없습니다");
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ 응답 성공:", response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ 응답 에러:", error.response?.status, error.config?.url);

    if (error.response?.status === 401) {
      console.error("인증 실패 - 로그인 필요");
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

      // 로그인 페이지로 리다이렉트 (무한 루프 방지)
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
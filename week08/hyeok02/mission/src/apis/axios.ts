import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

// 요청할 때마다 accessToken 헤더에 붙여줌
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 401 에러 발생 시 한 번만 retry, refreshToken으로 accessToken 갱신
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const { data } = await instance.post(
          "/v1/auth/token/access",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = data.accessToken;
        const newNickname = data.nickname; // ✅ 닉네임도 받는다고 가정

        localStorage.setItem("accessToken", newAccessToken);

        if (newNickname) {
          localStorage.setItem("nickname", newNickname); // ✅ 닉네임 저장
        }

        // ✅ storage 이벤트 발생
        window.dispatchEvent(new Event("storage"));

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

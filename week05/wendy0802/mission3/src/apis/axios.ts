import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const protectedEndpoints = [
      "/v1/users",
      "/v1/auth/protected",
      "/v1/auth/signout",
      "/v1/lps",
      "/v1/comments",
      "/v1/likes",
      "/v1/uploads",
    ];

    const isProtectedEndpoint = protectedEndpoints.some((endpoint) =>
      config.url?.startsWith(endpoint)
    );

    if (!accessToken && isProtectedEndpoint) {
      window.location.href = `/login`;
      return Promise.reject(new Error("로그인이 필요한 기능입니다"));
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
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      localStorage.removeItem("nickname");

      if (window.location.pathname !== "/login") {
        alert("로그인이 필요합니다.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

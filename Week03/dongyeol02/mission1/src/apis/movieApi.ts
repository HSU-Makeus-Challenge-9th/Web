import axios from "axios";

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
  timeout: 10000,
});

// 요청 인터셉터
movieApi.interceptors.request.use(
  (config) => {
    console.log("영화 API 요청:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
movieApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("영화 API 에러:", error);
    return Promise.reject(error);
  }
);

export default movieApi;

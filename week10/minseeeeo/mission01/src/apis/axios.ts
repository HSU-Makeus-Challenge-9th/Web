import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

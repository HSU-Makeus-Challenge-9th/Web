import axios from "axios";

const API_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default axiosClient;

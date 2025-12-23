import axios from 'axios';
const token = import.meta.env.VITE_TMDB_TOKEN;

export const axiosClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
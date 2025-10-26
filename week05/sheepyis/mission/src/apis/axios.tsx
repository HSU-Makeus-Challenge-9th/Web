import axios from "axios";
import { loadAuth } from "../utils/auth/authStorage";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({
  baseURL,
  headers: { accept: "application/json" },
});

API.interceptors.request.use((config) => {
  const { accessToken } = loadAuth();
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

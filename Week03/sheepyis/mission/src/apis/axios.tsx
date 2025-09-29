import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const accessToken = import.meta.env.VITE_API_KEY;

export const API = axios.create({
  baseURL: baseURL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

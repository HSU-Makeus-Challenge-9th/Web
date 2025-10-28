import axios from "../config/axiosConfig";

const API_BASE_URL = "http://localhost:8000";

interface LoginPayload {
  email: string;
  password: string;
}

export const signInUser = async ({ email, password }: LoginPayload) => {
  const response = await axios.post(`${API_BASE_URL}/v1/auth/signin`, {
    email,
    password,
  });

  return response.data;
};

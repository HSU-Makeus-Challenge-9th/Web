import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
}

export const signUpUser = async (payload: SignupPayload) => {
  console.log("API 요청 URL:", `${API_BASE_URL}/v1/auth/signup`);
  console.log("API 요청 데이터:", payload);

  const response = await axios.post(`${API_BASE_URL}/v1/auth/signup`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000, // 10초 타임아웃
  });

  return response.data;
};

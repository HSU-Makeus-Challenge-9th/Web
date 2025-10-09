import axios from "./axios";

interface SignUpPayload {
  email: string;
  password: string;
  nickname: string;
  profileImage?: string | null;
}

export const signUpUser = async ({
  email,
  password,
  nickname,
  profileImage,
}: SignUpPayload) => {
  const payload = {
    name: nickname,
    email,
    password,
    bio: "안녕하세요. 저는 매튜입니다.",
    avatar: profileImage ?? null,
  };

  const response = await axios.post("/v1/auth/signup", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

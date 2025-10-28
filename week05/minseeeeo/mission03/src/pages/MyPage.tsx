import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  console.log(data?.data.name);
  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-black text-white h-full">
      <h1 className="text-xl text-center mt-6">
        {data?.data.name}님, 환영합니다!
      </h1>
      <img
        src={data?.data.avatar as string}
        className="w-20 h-20 rounded-md"
      ></img>

      <button
        className="bg-pink-500 text-white w-25 h-10 rounded-md self-center hover:bg-pink-600 hover:shadow-md"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;

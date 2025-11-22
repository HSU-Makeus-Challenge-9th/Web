import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>([]);

  useEffect(() => {
    const getData = async () => {
      const response: ResponseMyInfoDto = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <nav className="w-full h-20 flex items-center justify-between px-6 bg-neutral-900 text-white">
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-pink-500 transition-colors"
          onClick={() => navigate("/")}
        >
          돌려돌려LP판
        </h1>

        <button
          onClick={handleLogout}
          className="bg-pink-600 text-white px-5 py-2 rounded-md text-md font-medium
                     hover:bg-pink-500 transition-colors cursor-pointer
                     disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed"
        >
          로그아웃
        </button>
      </nav>

      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <div className="flex flex-col items-center justify-center backdrop-blur-md rounded-2xl p-10 shadow-xl text-center border">
        <h1 className="text-2xl fond-semibold mb-3">
          {data.data?.name}님 환영합니다!
        </h1>

        <div className="flex justify-center items-center w-32 h-32 mb-6">
          <img
            src={data.data?.avatar as string}
            alt={"구글 프로필"}
            className="w-32 h-32 rounded-full object-cover border-3 shadow-lg transition-transform mx-auto"
          />
        </div>

        <h1 className="text-lg text-gray-300 mb-6">[ {data.data?.email} ]</h1>
        
        <button
          className="bg-pink-600 text-white px-5 py-2 rounded-md text-md font-medium
                     hover:bg-pink-500 transition-colors cursor-pointer
                     disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
      </main>
      
    </div>
  );
};

export default MyPage;

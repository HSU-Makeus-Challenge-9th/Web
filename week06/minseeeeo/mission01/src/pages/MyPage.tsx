import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };
    getData();
  }, []);

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
    </div>
  );
};

export default MyPage;

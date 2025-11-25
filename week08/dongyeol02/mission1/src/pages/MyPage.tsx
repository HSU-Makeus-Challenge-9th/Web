import { useGetMe } from "../hooks/useGetMe";

const MyPage = () => {
  const { data } = useGetMe();

  return (
    <>
      <div className="m-[10rem] flex flex-col items-center gap-[2rem]">
        {data?.data.avatar && <img src={data.data.avatar} alt="avatar" />}
        {!data?.data.avatar && (
          <div className="rounded-full bg-pink-400 h-30 w-30 flex items-center justify-center font-bold text-6xl text-white">
            {data?.data.email.trim()[0]}
          </div>
        )}
        <div>{data?.data.name}</div>
        <div>{data?.data.email}</div>
      </div>
    </>
  );
};

export default MyPage;

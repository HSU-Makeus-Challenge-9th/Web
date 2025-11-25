import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { DiAptana } from "react-icons/di";
import { Check } from "lucide-react";
import { usePatchMyInfo } from "../hooks/mutations/usePatchMyInfo";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    avatar: "",
  });

  const { mutate: patchProfile } = usePatchMyInfo();

  useEffect(() => {
    const getData = async () => {
      const response: ResponseMyInfoDto = await getMyInfo();
      setData(response);
      setForm({
        name: response.data.name,
        bio: response.data.bio ?? "",
        avatar: response.data.avatar ?? "",
      });
    };
    getData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    patchProfile(form, {
      onSuccess: (res) => {
        alert("프로필이 수정되었습니다!");
        setData(res);
        setIsEditing(false);
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex flex-col items-center justify-center text-center px-4">
        <div className="flex flex-col backdrop-blur-md p-8 shadow-xl text-center relative text-white">
          {isEditing ? (
            <Check
              size={28}
              className="absolute top-15 right-1 cursor-pointer hover:text-pink-400 transition"
              onClick={handleSave}
            />
          ) : (
            <DiAptana
              size={28}
              className="absolute top-15 right-1 cursor-pointer hover:text-pink-400 transition"
              onClick={() => setIsEditing(true)}
            />
          )}
          <div className="flex items-center gap-6 mb-6 text-left">
            <img
              src={
                data?.data.avatar
                  ? (data?.data?.avatar as string)
                  : "https://www.studiopeople.kr/common/img/default_profile.png"
              }
              alt="프로필"
              className="w-40 h-40 rounded-full object-cover shadow-lg"
            />

            <div className="flex flex-col items-start justify-center">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border rounded-md text-4xl mt-6 mb-2 outline-none focus:border-pink-400 transition w-full placeholder:text-2xl"
                    placeholder="닉네임을 입력해주세요"
                  />
                  <input
                    type="text"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="border rounded-md text-lg mb-2 outline-none focus:border-pink-400 transition w-full placeholder:text-base"
                    placeholder="소개"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-4xl mt-6 mb-2">{data?.data?.name}</h1>
                  <p className="text-lg mb-2">{data?.data?.bio}</p>
                </>
              )}
              <p className="text-lg mb-6">{data?.data?.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;

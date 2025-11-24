import { useEffect, useRef, useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import InputText from "../components/common/InputText";
import usePatchUserInfo from "../hooks/queries/usePatchUserInfo";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const MyPage = () => {
  const { data } = useGetMyInfo();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { mutate: patchMutate } = usePatchUserInfo();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 수정할 정보를 위한 상태
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  useEffect(() => {
    if (data?.data) {
      setEditName(data.data.name);
      setEditBio(data.data.bio || "");
      setEditAvatar(data.data.avatar || "");
    }
  }, [data]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setEditAvatar("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSumbit = () => {
    patchMutate(
      {
        name: editName,
        bio: editBio,
        avatar: editAvatar,
      },
      {
        onSuccess: () => {
          alert("프로필이 수정되었습니다.");
          setIsInfoOpen(false);
        },
        onError: () => {
          alert("프로필 수정에 실패했습니다.");
        },
      }
    );
  };

  console.log(data?.data.name);
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-[10%] text-white">
      <div className="flex justify-center items-center gap-2">
        <h1 className="text-3xl text-center font-bold">
          {data?.data.name}님, 환영합니다!
        </h1>
        <Pencil
          className="hover:text-pink-500 cursor-pointer"
          onClick={() => {
            setIsInfoOpen(!isInfoOpen);
          }}
        />
      </div>
      {isInfoOpen ? (
        <div className="flex gap-5 items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="relative">
            <img
              src={editAvatar || (data?.data.avatar as string)}
              className="w-30 h-30 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              alt={`${data?.data.name}님의 프로필 사진`}
              onClick={handleAvatarClick}
            ></img>
            {editAvatar && (
              <button
                onClick={handleRemoveAvatar}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                title="프로필 사진 삭제"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2 w-60">
            <div className="flex items-center gap-3">
              <InputText
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <Check
                size={30}
                className="hover:text-pink-500 cursor-pointer"
                onClick={handleSumbit}
              />
            </div>
            <InputText
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="한줄 소개를 입력하세요"
            />
            {data?.data.email}
          </div>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          <img
            src={data?.data.avatar as string}
            className="w-30 h-30 rounded-full"
            alt={`${data?.data.name}님의 프로필 사진`}
          ></img>
          <div className="flex flex-col gap-2">
            <p className="font-bold">{data?.data.name}</p>
            <p>{data?.data.bio || "한줄 소개글 없음"}</p>
            <p>{data?.data.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;

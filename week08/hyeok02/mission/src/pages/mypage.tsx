import { useState, useEffect, useRef } from "react";
import { useUpdateUserProfile } from "../hooks/user/useupdateprofile";
import axios from "../apis/axios";

const MyPage = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useUpdateUserProfile();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get("/v1/users/me");
      setName(data.data.name || "");
      setBio(data.data.bio || "");
      setAvatar(data.data.avatar || "");
      setEmail(data.data.email || "");
    };
    fetchUser();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setAvatar(preview);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      if (!name.trim()) {
        alert("닉네임은 비워둘 수 없습니다.");
        return;
      }
      mutate({ name, bio, avatar });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen flex items-start justify-center mt-20">
      <div className="bg-gray-800 rounded-xl p-6 w-[500px] flex items-center gap-6 text-white shadow-md">
        {/* 프로필 이미지 */}
        <div 
          className="w-24 h-24 rounded-full bg-gray-600 overflow-hidden cursor-pointer"
          onClick={() => isEditing && fileInputRef.current?.click()}
        >
          {avatar && (
            <img
              src={avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {/* 오른쪽 정보 */}
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-2 px-3 py-1 rounded border border-gray-600 bg-gray-700 text-white"
              />
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full mb-2 px-3 py-1 rounded border border-gray-600 bg-gray-700 text-white"
              />
            </>
          ) : (
            <>
              <p className="text-lg mb-1">{name}</p>
              <p className="text-sm mb-2 text-gray-400">{bio}</p>
            </>
          )}
          <p className="text-xs text-gray-500">{email}</p>
        </div>

        {/* 수정/완료 버튼 */}
        <button
          onClick={handleEditToggle}
          className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-600"
        >
          {isEditing ? "완료" : "수정"}
        </button>
      </div>
    </div>
  );
};

export default MyPage;

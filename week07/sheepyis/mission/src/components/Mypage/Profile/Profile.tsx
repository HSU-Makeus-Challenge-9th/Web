import * as S from "./styles/ProfileStyle";
import { useUserQuery } from "../../../hooks/auth/useUserQuery";
import Spinner from "../../Common/Spinner/Spinner";
import { useState, useRef, useEffect } from "react";
import { useEditUserMutation } from "../../../hooks/auth/useEditUserMutation";
import { useUploadMutation } from "../../../hooks/images/useUploadMutation";
import { useCallback } from "react";

interface ProfileProps {
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
  registerSaveFn?: (fn: () => void) => void;
}
const Profile = ({
  isEditMode,
  setIsEditMode,
  registerSaveFn,
}: ProfileProps) => {
  const { data: user, isLoading, isError } = useUserQuery();
  const { mutate: editUser } = useEditUserMutation();
  const { mutateAsync: uploadImage } = useUploadMutation();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "이름이 없습니다.");
      setBio(user.bio || "자기소개가 없습니다.");
      setAvatar(user.avatar || null);
      setPreview(user.avatar || null);
    }
  }, [user]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    const imageUrl = await uploadImage(file);
    setAvatar(imageUrl);
  };

  const handleAvatarClick = () => {
    if (isEditMode) fileInputRef.current?.click();
  };

  const handleSave = useCallback(() => {
    editUser(
      { name, bio, avatar: avatar || null },
      {
        onSuccess: () => {
          setIsEditMode(false);
        },
      }
    );
  }, [name, bio, avatar]);

  useEffect(() => {
    if (registerSaveFn && user) {
      registerSaveFn(() => handleSave);
    }
  }, [registerSaveFn, handleSave]);

  if (isLoading) return <Spinner />;
  if (isError || !user)
    return (
      <p className={S.ProfileErrorP}>사용자 정보를 불러오지 못했습니다.</p>
    );

  return (
    <div className={S.ProfileContainer}>
      <div onClick={handleAvatarClick} className="cursor-pointer">
        {preview ? (
          <img src={preview} alt="avatar" className={S.ProfileImg} />
        ) : (
          <div className={S.NotProfileImg} />
        )}

        {isEditMode && (
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        )}
      </div>

      <input
        type="text"
        value={name}
        readOnly={!isEditMode}
        onChange={(e) => setName(e.target.value)}
        className={S.ProfileInput}
      />

      <input
        type="text"
        value={bio}
        readOnly={!isEditMode}
        onChange={(e) => setBio(e.target.value)}
        className={S.ProfileInput}
      />

      <p className={S.ProfileP}>{user.email}</p>
    </div>
  );
};

export default Profile;

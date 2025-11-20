import HeaderButton from "../../components/Common/Button/HeaderButton/HeaderButton";
import { useAuth } from "../../context/auth/AuthContext";
import { useNavigation } from "../../hooks/useNavigation";
import * as S from "../../styles/pages/mypage/MypageStyle";
import Profile from "../../components/Mypage/Profile/Profile";
import { useState } from "react";
import { useLogoutMutation } from "../../hooks/auth/useLogoutMutation";

const Mypage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [saveFn, setSaveFn] = useState<(() => void) | null>(null);
  const { mutate: logoutMutate, isPending } = useLogoutMutation();

  const handleEditButton = () => {
    if (isEditMode && saveFn) {
      saveFn();
    } else {
      setIsEditMode(true);
    }
  };

  return (
    <div className={S.MypageContainer}>
      <Profile
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        registerSaveFn={setSaveFn}
      />

      <div className={S.ButtonContainer}>
        <HeaderButton
          label={isEditMode ? "수정 완료" : "프로필 수정"}
          backgroundColor="bg-gray-500"
          onClick={handleEditButton}
        />
        <HeaderButton
          label={isPending ? "로그아웃 중..." : "로그아웃"}
          backgroundColor="bg-pink-600"
          onClick={() => logoutMutate()}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default Mypage;

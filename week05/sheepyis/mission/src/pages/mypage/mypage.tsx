import HeaderButton from "../../components/Common/Button/HeaderButton/HeaderButton";
import { useAuth } from "../../context/auth/AuthContext";
import { useNavigation } from "../../hooks/useNavigation";
import * as S from "../../styles/pages/mypage/MypageStyle";

const Mypage = () => {
  const { clearAuth } = useAuth();
  const { handleMoveClick } = useNavigation();

  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    clearAuth();
    setTimeout(() => handleMoveClick("/"), 0);
  };

  return (
    <div className={S.MypageContainer}>
      <h1>마이페이지</h1>

      <HeaderButton
        label="로그아웃"
        backgroundColor="bg-pink-600"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Mypage;

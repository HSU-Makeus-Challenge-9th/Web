import * as S from "./styles/RootHeaderStyle";
import HeaderButton from "../../Button/HeaderButton/HeaderButton";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useAuth } from "../../../../context/auth/AuthContext";
import Hamburger from "../../../../assets/images/hamburger.svg";

interface RootHeaderProps {
  onToggleSidebar?: () => void;
}

const RootHeader = ({ onToggleSidebar }: RootHeaderProps) => {
  const { handleMoveClick } = useNavigation();
  const { name, accessToken } = useAuth();

  const isLoggedIn = !!accessToken;

  return (
    <div className={S.RootHeaderContainer}>
      <div className={S.RootHeaderLeftContainer}>
        <img
          className={`${S.HamburgerImg} hamburger md:hidden`}
          alt="hamburger"
          src={Hamburger}
          onClick={onToggleSidebar}
        />

        <p className={S.RootHeaderP} onClick={() => handleMoveClick("/")}>
          돌려돌려LP판
        </p>
      </div>

      <div className={S.RootHeaderRightContainer}>
        {isLoggedIn ? (
          <>
            <p className={`${S.RootHeaderP} !text-[1.2vw] !text-white`}>
              {name ?? "사용자"}님 환영합니다.
            </p>
            <HeaderButton
              label="마이페이지"
              backgroundColor="bg-gray-500"
              onClick={() => {
                handleMoveClick("/mypage");
              }}
            />
          </>
        ) : (
          <>
            <HeaderButton
              label="로그인"
              backgroundColor="bg-black"
              onClick={() => handleMoveClick("/login")}
            />
            <HeaderButton
              label="회원가입"
              backgroundColor="bg-pink-600"
              onClick={() => handleMoveClick("/signup")}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RootHeader;

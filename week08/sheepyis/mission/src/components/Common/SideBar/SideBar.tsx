import * as S from "./styles/SideBarStyle";
import { useNavigation } from "../../../hooks/useNavigation";

interface SideBarProps {
  isOpen: boolean;
  onDeleteClick: () => void;
}

const SideBar = ({ isOpen, onDeleteClick }: SideBarProps) => {
  const { handleMoveClick } = useNavigation();

  return (
    <div
      className={`
        ${S.SidebarWrapper}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className={S.SideBarContainer}>
        <div className={S.SideBarInnerContainer}>
          <p className={S.SideBarP} onClick={() => handleMoveClick("/search")}>
            찾기
          </p>
          <p className={S.SideBarP} onClick={() => handleMoveClick("/mypage")}>
            마이페이지
          </p>
        </div>

        <p className={S.SideBarP} onClick={onDeleteClick}>
          탈퇴하기
        </p>
      </div>
    </div>
  );
};

export default SideBar;

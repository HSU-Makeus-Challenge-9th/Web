import * as S from "./styles/SideBarStyle";

interface SideBarProps {
  isOpen: boolean;
  onDeleteClick: () => void;
}

const SideBar = ({ isOpen, onDeleteClick }: SideBarProps) => {
  return (
    <div
      className={`
        ${S.SidebarWrapper}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className={S.SideBarContainer}>
        <div className={S.SideBarInnerContainer}>
          <p className={S.SideBarP}>찾기</p>
          <p className={S.SideBarP}>마이페이지</p>
        </div>

        <p className={S.SideBarP} onClick={onDeleteClick}>
          탈퇴하기
        </p>
      </div>
    </div>
  );
};

export default SideBar;

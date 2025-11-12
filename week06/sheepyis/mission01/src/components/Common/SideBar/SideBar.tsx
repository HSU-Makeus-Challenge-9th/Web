import * as S from "./styles/SideBarStyle";

interface SideBarProps {
  isOpen: boolean;
}

const SideBar = ({ isOpen }: SideBarProps) => {
  return (
    <div
      className={`
    sidebar fixed left-0 top-[5vw] md:top-0 z-50 transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:relative md:translate-x-0
  `}
    >
      <div className={S.SideBarContainer}>
        <p className={S.SideBarP}>찾기</p>
        <p className={S.SideBarP}>마이페이지</p>
      </div>
    </div>
  );
};

export default SideBar;

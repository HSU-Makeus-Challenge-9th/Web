import NavbarList from "./NavbarList";
import * as S from "./NavbarStyle";

const Navbar = () => {
  return (
    <div className={S.NavbarContainer}>
      <NavbarList />
    </div>
  );
};

export default Navbar;

import { NavbarData } from "../../mocks/navbar/navbarData";
import NavbarItem from "./NavbarItem";
import * as S from "./NavbarStyle";

const NavbarList = () => {
  return (
    <ul className={S.NavbarListContainer}>
      {NavbarData.map((item) => (
        <NavbarItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default NavbarList;

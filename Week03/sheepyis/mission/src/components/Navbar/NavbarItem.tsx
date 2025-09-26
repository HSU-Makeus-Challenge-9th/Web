import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./NavbarStyle";

interface NavbarItemProps {
  item: {
    id: number;
    name: string;
    link: string;
  };
}

const NavbarItem = ({ item }: NavbarItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavbarClick = () => {
    navigate(item.link);
  };

  const isActive = location.pathname === item.link;

  return (
    <li
      className={`${S.NavbarItemP} ${
        isActive ? "text-green-600 font-bold" : "text-black"
      }`}
      onClick={handleNavbarClick}
    >
      {item.name}
    </li>
  );
};

export default NavbarItem;

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-pink-400 font-bold" : "text-white hover:text-pink-300";

  return (
    <nav className="w-full bg-black py-2 px-5 flex items-center space-x-5 text-sm select-none">
      <NavLink to="/" className={linkClass}>
        홈
      </NavLink>
      <NavLink to="/movies/popular" className={linkClass}>
        인기 영화
      </NavLink>
      <NavLink to="/movies/now-playing" className={linkClass}>
        상영 중
      </NavLink>
      <NavLink to="/movies/top-rated" className={linkClass}>
        평점 높은
      </NavLink>
      <NavLink to="/movies/upcoming" className={linkClass}>
        개봉 예정
      </NavLink>
    </nav>
  );
};

export default Navbar;

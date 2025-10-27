import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="px-10 py-10 flex items-center gap-10">
        <Link to="/">홈페이지</Link>
        <Link to="/popular">인기 영화</Link>
        <Link to="/now-playing">상영중인 영화</Link>
        <Link to="/top-rated">최고평점 영화</Link>
        <Link to="/upcomming">개봉예정 영화</Link>
      </div>
    </nav>
  );
};
export default NavBar;

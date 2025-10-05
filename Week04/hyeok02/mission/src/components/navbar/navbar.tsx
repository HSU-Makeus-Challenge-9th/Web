import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const isValidNick = (v: unknown): v is string => {
  if (typeof v !== "string") return false;
  const s = v.trim();
  if (!s) return false;
  const low = s.toLowerCase();
  return low !== "undefined" && low !== "null";
};

type Dict = Record<string, unknown>;
const isDict = (v: unknown): v is Dict =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const extractFromObj = (obj: unknown): string | null => {
  if (!isDict(obj)) return null;

  const d = obj as Dict;
  const keys = ["nickname", "nickName", "name", "displayName", "username"];

  for (const k of keys) {
    const val = d[k];
    if (isValidNick(val)) return String(val).trim();
  }

  const candidates: unknown[] = [];
  if (isDict(d["user"])) candidates.push(d["user"]);
  if (isDict(d["profile"])) candidates.push(d["profile"]);
  if (isDict(d["data"])) {
    const data = d["data"] as Dict;
    for (const k of keys) {
      const val = data[k];
      if (isValidNick(val)) return String(val).trim();
    }
    if (isDict(data["user"])) candidates.push(data["user"]);
  }

  for (const c of candidates) {
    const found = extractFromObj(c);
    if (found) return found;
  }

  return null;
};

const pickupNickname = (): string | null => {
  const direct = localStorage.getItem("nickname");
  if (isValidNick(direct)) return direct.trim();

  const raw = localStorage.getItem("user");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    const guessed = extractFromObj(parsed);
    return guessed ?? null;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const isActive = (path: string) => location.pathname === path;

  const linkStyle = (path: string) =>
    isActive(path)
      ? "text-pink-400 font-bold"
      : "text-white hover:text-pink-300";

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);

    const nick = pickupNickname();
    if (nick && isValidNick(nick)) {
      if (localStorage.getItem("nickname") !== nick) {
        localStorage.setItem("nickname", nick);
      }
      setNickname(nick);
    } else {
      setNickname(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setNickname(null);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-zinc-900 py-2 px-5 flex justify-between items-center text-sm select-none">
      <div className="flex space-x-5 items-center">
        {isAuthPage ? (
          <span className="text-pink-500 font-bold text-lg">앨빈의 LP판</span>
        ) : (
          <>
            <Link to="/" className={linkStyle("/")}>
              홈
            </Link>
            <Link to="/movies/popular" className={linkStyle("/movies/popular")}>
              인기 영화
            </Link>
            <Link
              to="/movies/now-playing"
              className={linkStyle("/movies/now-playing")}
            >
              상영 중
            </Link>
            <Link
              to="/movies/top-rated"
              className={linkStyle("/movies/top-rated")}
            >
              평점 높은
            </Link>
            <Link
              to="/movies/upcoming"
              className={linkStyle("/movies/upcoming")}
            >
              개봉 예정
            </Link>
          </>
        )}
      </div>

      <div className="flex space-x-2 items-center">
        {isLoggedIn ? (
          <>
            <span className="text-white">{nickname}님 환영합니다.</span>
            <button
              onClick={handleLogout}
              className="bg-pink-500 px-3 py-1 rounded hover:bg-pink-600 text-white"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 text-white"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="bg-pink-500 px-3 py-1 rounded hover:bg-pink-600 text-white"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

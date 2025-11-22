import { Link, NavLink } from "react-router-dom";

const baseBtn =
  "rounded-md px-3 py-1.5 text-sm transition-colors";
const ghost =
  "border border-zinc-700 text-zinc-200 hover:bg-zinc-900";
const solid =
  "bg-pink-500 font-semibold text-white hover:bg-pink-600";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800
                       bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="font-extrabold text-pink-500 tracking-tight">
          둘러둘러LP판
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${baseBtn} ${ghost} ${isActive ? "bg-zinc-900" : ""}`
            }
          >
            로그인
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `${baseBtn} ${solid} ${isActive ? "ring-2 ring-pink-400/50" : ""}`
            }
          >
            회원가입
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
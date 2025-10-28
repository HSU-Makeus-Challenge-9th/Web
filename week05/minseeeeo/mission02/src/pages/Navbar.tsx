import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="h-16 bg-gray-950 flex items-center justify-between px-6">
      <span
        className="text-pink-500 font-bold cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        돌려돌려LP판
      </span>
      <div className="flex gap-3">
        <button
          className="bg-black text-white px-4 rounded-sm hover:bg-gray-700"
          onClick={() => {
            navigate("/my");
          }}
        >
          마이페이지
        </button>
        <button
          className="bg-black text-white px-4 rounded-sm hover:bg-gray-700"
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </button>
        <button
          className="bg-pink-500 text-white w-20 py-1 rounded-sm hover:bg-pink-600"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </button>
      </div>
    </nav>
  );
};
export default Navbar;

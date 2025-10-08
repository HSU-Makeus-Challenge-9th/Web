import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 h-20 p-5 flex justify-between">
      <Link className="font-bold text-3xl text-pink-600" to={"/"}>
        돌려돌려 돌림판
      </Link>
      <div className="flex items-baseline justify-center gap-4">
        <Link
          className=" text-lg rounded-xl text-white h-10 w-25 p-2 bg-black flex items-center justify-center"
          to={"/login"}
        >
          로그인
        </Link>
        <Link
          className=" text-lg rounded-xl text-white h-10 w-25 p-2 bg-pink-600 flex items-center justify-center"
          to={"signup"}
        >
          회원가입
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

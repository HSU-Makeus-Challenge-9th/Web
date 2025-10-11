const Navbar = () => {
  return (
    <nav className="h-16 bg-gray-950 flex items-center justify-between px-6">
      <span className="text-pink-500 font-bold">돌려돌려LP판</span>
      <div className="flex gap-3">
        <button className="bg-black text-white px-4 rounded-sm hover:bg-gray-700">
          로그인
        </button>
        <button className="bg-pink-500 text-white w-20 py-1 rounded-sm hover:bg-pink-600">
          회원가입
        </button>
      </div>
    </nav>
  );
};
export default Navbar;

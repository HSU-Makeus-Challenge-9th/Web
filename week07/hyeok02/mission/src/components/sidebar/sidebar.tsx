import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import { useState } from "react";
import WithdrawModal from "../withdrawmodal";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-[175px] min-h-screen bg-neutral-900 flex flex-col px-4 py-6 shrink-0 select-none">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-white opacity-50 pointer-events-none">
          <FaSearch />
          <Link to="/" className="text-sm">찾기</Link>
        </div>
        <div className="flex items-center gap-2 text-white opacity-50 hover:opacity-80">
          <BiSolidMoviePlay />
          <Link to="/mypage" className="text-sm hover:text-gray-200">마이페이지</Link>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-170 text-sm text-red-500 hover:text-red-600"
        >
          탈퇴하기
        </button>
      </div>

      {isModalOpen && <WithdrawModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Sidebar;

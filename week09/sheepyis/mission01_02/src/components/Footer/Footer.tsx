import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { openModal } from "../../features/modal/modalSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const total = useSelector((state: RootState) => state.cart.total);

  return (
    <div className="flex justify-between items-center">
      <button
        className="border border-black font-bold p-1 rounded-sm cursor-pointer"
        onClick={() => dispatch(openModal())}
      >
        전체 삭제
      </button>
      <p className="font-bold">총 금액: {total.toLocaleString()}원</p>
    </div>
  );
};

export default Footer;

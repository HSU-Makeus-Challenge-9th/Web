import { useCartStore, useModalStore } from "../../store";

const Footer = () => {
  const total = useCartStore((state) => state.total);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="flex justify-between items-center">
      <button
        className="border border-black font-bold p-1 rounded-sm cursor-pointer"
        onClick={openModal}
      >
        전체 삭제
      </button>
      <p className="font-bold">총 금액: {total.toLocaleString()}원</p>
    </div>
  );
};

export default Footer;

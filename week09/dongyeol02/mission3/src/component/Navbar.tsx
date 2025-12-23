type NavbarProps = {
  totalAmount: number;
};

const Navbar = ({ totalAmount }: NavbarProps) => {
  return (
    <div className="w-full h-25 bg-sky-700/30 flex items-center justify-between px-5">
      <div className="font-bold text-white">dongyeol</div>
      <div className="font-bold text-white">장바구니 {totalAmount}</div>
    </div>
  );
};

export default Navbar;

import ItemCart from "./ItemCart";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const ListCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="w-full mb-3 text-center text-gray-500 font-semibold py-10 border-b border-gray-500">
        플레이리스트가 비어있어요.
      </div>
    );
  }

  return (
    <div className="w-full mb-3">
      {cartItems.map((item) => (
        <ItemCart key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListCart;

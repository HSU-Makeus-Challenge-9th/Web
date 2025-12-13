import ItemCart from "./ItemCart";
import { useCartStore } from "../../store/cartStore";

const ListCart = () => {
  const cartItems = useCartStore((state) => state.cartItems);

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

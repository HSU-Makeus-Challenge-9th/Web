import { useShallow } from "zustand/shallow";
import { useCartStore } from "../store/CartStore";
import CartItem from "./CartItem";

const CartList = () => {
  // state 가져오기
  const { cartItems } = useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
    }))
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <ul>
        {cartItems.lp.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;

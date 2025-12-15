// CartList.tsx (수정)
import { useCartStore } from "../store/useCartStore";
import CartItem from "./CartItem";
import type { CartItem as CartItemType } from "../type/cart";

type CartListProps = {
  items: CartItemType[];
};

function CartList({ items }: CartListProps) {
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={() => increase(item.id)}
          onDecrease={() => decrease(item.id)}
        />
      ))}
    </ul>
  );
}

export default CartList;

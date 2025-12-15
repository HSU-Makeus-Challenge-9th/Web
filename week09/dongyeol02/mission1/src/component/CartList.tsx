// CartList.tsx
import type { CartItem as CartItemType } from "../type/cart";
import CartItem from "./CartItem";

type CartListProps = {
  items: CartItemType[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
};

function CartList({ items, onIncrease, onDecrease }: CartListProps) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={() => onIncrease(item.id)}
          onDecrease={() => onDecrease(item.id)}
        />
      ))}
    </ul>
  );
}

export default CartList;

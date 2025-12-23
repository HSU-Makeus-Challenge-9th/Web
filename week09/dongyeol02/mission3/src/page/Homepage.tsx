// Homepage.tsx
import Navbar from "../component/Navbar";
import CartList from "../component/CartList";
import CartSummary from "../component/CartSummary";
import ClearCartModal from "../component/ClearCartModal";
import { useCartStore } from "../store/useCartStore";
import { useModalStore } from "../store/useModalStore";

const Homepage = () => {
  // cart 상태
  const cartItems = useCartStore((state) => state.cartItems);
  const amount = useCartStore((state) => state.amount);
  const total = useCartStore((state) => state.total);
  const clearCart = useCartStore((state) => state.clearCart);

  // modal 상태
  const isOpen = useModalStore((state) => state.isOpen);
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);

  console.log("Homepage render, amount =", amount);

  const handleConfirmClear = () => {
    clearCart();
    close();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar totalAmount={amount} />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <CartList items={cartItems} />
        <CartSummary totalAmount={amount} totalPrice={total} onClear={open} />
      </main>

      <ClearCartModal
        isOpen={isOpen}
        onCancel={close}
        onConfirm={handleConfirmClear}
      />
    </div>
  );
};

export default Homepage;

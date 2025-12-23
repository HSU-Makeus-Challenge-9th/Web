import Navbar from "./components/Navbar";
import CartList from "./components/CartList";
import Modal from "./components/Modal";
import useCartStore from "./store/useCartStore";

function App() {
  const { isOpen } = useCartStore();

  return (
    <main className="bg-gray-50 min-h-screen relative font-sans">
      {isOpen && <Modal />}
      <Navbar />
      <CartList />
    </main>
  );
}

export default App;

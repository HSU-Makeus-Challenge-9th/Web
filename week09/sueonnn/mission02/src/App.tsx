import Navbar from "./components/Navbar";
import CartList from "./components/CartList";
import Modal from "./components/Modal";
import { useAppSelector } from "./hooks/useCustomRedux";

function App() {
  const { isOpen } = useAppSelector((state) => state.modal);

  return (
    <main className="bg-gray-50 min-h-screen relative">
      {isOpen && <Modal />}

      <Navbar />
      <CartList />
    </main>
  );
}

export default App;

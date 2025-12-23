import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { useShallow } from "zustand/shallow";
import { useModalStore } from "./store/ModalStore";

function App() {
  // state 가져오기
  const { isOpen } = useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
    }))
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartList />
      <Footer />
      {isOpen && <Modal />}
    </div>
  );
}

export default App;

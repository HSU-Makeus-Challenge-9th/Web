import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSelector } from "./hooks/useCustomRedux";
import Modal from "./components/Modal";

function App() {
  const { isOpen } = useSelector((state) => state.modal);

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

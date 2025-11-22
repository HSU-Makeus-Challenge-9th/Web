import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import FloatingButton from '../components/FloatingButton';
import { useSidebar } from '../hooks/useSidebar';

const RootLayout = () => {
  const { isOpen, close, toggle } = useSidebar();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <NavBar onMenuClick={toggle} />
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={isOpen} onClose={close} />
        <main className="flex-1 lg:pl-48 overflow-auto">
          <Outlet />
        </main>
      </div>
      <FloatingButton />
    </div>
  );
};

export default RootLayout;
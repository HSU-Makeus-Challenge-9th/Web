import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import FloatingButton from '../components/FloatingButton';

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <NavBar onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 lg:pl-48 overflow-auto">
          <Outlet />
        </main>
      </div>
      <FloatingButton />
    </div>
  );
};

export default RootLayout;
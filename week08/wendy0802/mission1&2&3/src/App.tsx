import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/signup/index";
import LPDetailPage from "./pages/LPDetailPage/index";
import MyPage from "./pages/MyPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./pages/searchPage";
import { SidebarProvider, useSidebar } from "./hooks/useSidebar.tsx";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isOpen } = useSidebar();

  return (
    <div className="flex min-h-screen bg-black">
      <div
        aria-hidden
        className={`transition-[width] duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0"
        }`}
      />
      <div className="flex-1 min-h-screen bg-black transition-colors duration-300">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/lp/:lpid" element={<LPDetailPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppContent />
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;

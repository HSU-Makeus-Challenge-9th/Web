import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/signup/index";
import LPDetailPage from "./pages/LPDetailPage/index";
import MyPage from "./pages/MyPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/lp/:lpid" element={<LPDetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

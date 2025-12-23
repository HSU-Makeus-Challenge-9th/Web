import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm py-4 mb-8">
        <div className="container mx-auto px-4">
          <span className="text-xl font-black text-blue-600">YONG FLIX</span>
        </div>
      </nav>

      <AppLayout>
        <HomePage />
      </AppLayout>

      <footer className="mt-20 py-10 border-t border-gray-200 text-center text-gray-400 text-sm">
        © 2025 YongCoding React Optimization Study
      </footer>
    </div>
  );
}

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-7xl mx-auto">{children}</div>
);

export default App;

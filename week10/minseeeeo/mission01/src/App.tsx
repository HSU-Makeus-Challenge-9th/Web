import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import MovieSearchPage from "./pages/MovieSearchPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-full">
        <MovieSearchPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;

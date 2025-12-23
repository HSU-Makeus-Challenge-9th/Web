import UseMemoPage from "./pages/UseMemoPage";

function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8">
        <UseMemoPage />
      </div>
    </main>
  );
}

export default App;

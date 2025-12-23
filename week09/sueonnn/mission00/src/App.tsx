import UseReducerPage from "./components/UseReducerPage";
import UseReducerCompany from "./components/UseReducerCompany";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 gap-10">
      <section className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          1. 기본 예제: Counter
        </h2>
        <UseReducerPage />
      </section>

      <section className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          2. 심화 예제: 직무 변경 (Validation)
        </h2>
        <UseReducerCompany />
      </section>
    </div>
  );
}

export default App;

import { useTheme } from "../contexts/ThemeContext";
import { TodoProvider } from "../contexts/TodoContext"; // ← 경로 확인!
import TodoForm from "./TodoForm";
import TodoSection from "./TodoSection";

function ThemeContent() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={
        "p-6 w-full flex flex-col items-center " +
        (isLight ? "bg-white text-black" : "bg-gray-900 text-white")
      }
    >
      <h1 className="text-3xl font-extrabold mb-3">Todo List</h1>
      <p className="text-center mb-6 opacity-80">투두 리스트로 관리 해봐요~</p>

      {/* ✅ 여기서부터 투두 영역 */}
      <TodoProvider>
        <div className="w-full max-w-lg space-y-6">
          <TodoForm />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TodoSection title="해야 할 일" isDone={false} />
            <TodoSection title="해낸 일" isDone={true} />
          </div>
        </div>
      </TodoProvider>
    </div>
  );
}

export default ThemeContent;

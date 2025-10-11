import { useState } from "react";
import { useTodoContext } from "../contexts/TodoContext";
import { useTheme } from "../contexts/ThemeContext";

const TodoForm = () => {
  const { addTodo } = useTodoContext();
  const [inputValue, setInputValue] = useState("");
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handleSubmit = () => {
    const text = inputValue.trim();
    if (text) {
      addTodo(text);
      setInputValue("");
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) handleSubmit();
  };

  return (
    <div className="flex w-full gap-2">
      <input
        type="text"
        placeholder="할 일 입력"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
        className={
          "flex-1 rounded-md px-3 py-2 outline-none border " +
          (isLight
            ? "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:border-blue-500"
            : "bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-blue-400")
        }
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!inputValue.trim()}
        className={
          "px-4 py-2 rounded-md font-medium transition-colors border " +
          (isLight
            ? // 라이트
              "bg-blue-500 text-white hover:bg-blue-600 border-blue-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
            : // 다크
              "bg-blue-600 text-white hover:bg-blue-500 border-blue-400 disabled:bg-gray-700 disabled:text-gray-400 disabled:border-gray-600")
        }
      >
        추가
      </button>
    </div>
  );
};

export default TodoForm;

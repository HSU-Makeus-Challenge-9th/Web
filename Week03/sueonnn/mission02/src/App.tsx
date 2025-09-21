import React, { useEffect } from "react";
import { TodoProvider } from "./context/TodoContext";
import { ThemeProvider, useTheme, THEME } from "./context/ThemeProvider";
import TodoForm from "./components/TodoForm";
import TodoSection from "./components/TodoSection";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/darkMode.css";

const TodoApp = () => {
  const { theme } = useTheme();

  // 다크모드 테마 적용
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.toLowerCase());
  }, [theme]);

  return (
    <div className="app-container">
      {/* 헤더 */}
      <div className="app-header">
        <h1 className="app-title">Todo List</h1>
        <ThemeToggle />
      </div>

      {/* Todo 입력 폼 */}
      <TodoForm />

      {/* Todo 리스트 섹션 */}
      <div className="todo-sections">
        <TodoSection title="할 일" isDone={false} />
        <TodoSection title="완료" isDone={true} />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;

import React from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoSection from "./components/TodoSection";
import "./index.css";

const TodoApp = () => {
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">TODO LIST</h1>

      <TodoForm />

      <div className="render-container">
        <TodoSection title="할 일" isDone={false} />
        <TodoSection title="완료" isDone={true} />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

export default App;

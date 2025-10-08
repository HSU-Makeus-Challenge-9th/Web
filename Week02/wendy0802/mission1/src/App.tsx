import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";
import { useTodo } from "./hooks/useTodo";
import "./App.css";

const TodoApp: React.FC = () => {
  const { incompleteTodos, completedTodos } = useTodo();

  return (
    <div className="TodoContainer">
      <h1>YONG TODO</h1>
      <TodoInput />
      <div className="Listcontainer">
        <TodoList
          title="할 일"
          todos={incompleteTodos}
          containerClass="leftcontainer"
        />

        <TodoList
          title="완료"
          todos={completedTodos}
          containerClass="rightcontainer"
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

export default App;

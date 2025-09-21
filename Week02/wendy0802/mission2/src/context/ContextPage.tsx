import React from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useTodo } from "../hooks/useTodo";
import Navbar from "./Navbar";

const ContextPage: React.FC = () => {
  const { incompleteTodos, completedTodos } = useTodo();

  return (
    <>
      <Navbar />
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
    </>
  );
};

export default ContextPage;

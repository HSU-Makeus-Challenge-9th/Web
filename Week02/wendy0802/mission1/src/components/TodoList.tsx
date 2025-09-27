import React from "react";
import TodoItem from "./TodoItem";
import type { TTodo } from "../types/todo"; 

interface TodoListProps {
  title: string;
  todos: TTodo[];
  containerClass: string;
}

const TodoList: React.FC<TodoListProps> = ({
  title,
  todos,
  containerClass,
}) => {
  return (
    <div className={containerClass}>
      <p>{title}</p>
      <div className="todoList">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

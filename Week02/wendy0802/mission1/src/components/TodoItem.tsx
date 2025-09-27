import React from "react";
import type { TTodo } from "../types/todo";
import { useTodo } from "../hooks/useTodo";

interface TodoItemProps {
  todo: TTodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodo();

  return (
    <div className="TodoItem">
      <span
        className={`TodoText ${todo.completed ? "completed" : ""}`}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      {!todo.completed && (
        <button className="completeBtn" onClick={() => toggleTodo(todo.id)}>
          완료
        </button>
      )}
      {todo.completed && (
        <button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>
          삭제
        </button>
      )}
    </div>
  );
};

export default TodoItem;

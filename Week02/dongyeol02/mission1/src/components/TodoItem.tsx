import React from "react";
import { useTodo } from "../hooks/useTodo";

interface TodoItemProps {
  todo: string;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index }) => {
  const { handleComplete } = useTodo(); // Context에서 직접 가져옴!!

  return (
    <li>
      {todo} <button onClick={() => handleComplete(index)}>완료</button>
    </li>
  );
};

export default TodoItem;

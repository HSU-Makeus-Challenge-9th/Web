import React from "react";
import { useTodo } from "../hooks/useTodo";

const TodoInput: React.FC = () => {
  const { inputValue, setInputValue, addTodo } = useTodo();

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <input
      id="todoInput"
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyUp={handleKeyUp}
      placeholder="스터디 계획을 작성해보세요!"
    />
  );
};

export default TodoInput;

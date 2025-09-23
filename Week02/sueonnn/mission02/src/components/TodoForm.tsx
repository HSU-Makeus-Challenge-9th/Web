import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

const TodoForm = () => {
  const { addTodo } = useTodoContext();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const text = inputValue.trim();
    if (text) {
      addTodo(text);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="todo-form">
      <input
        type="text"
        className="todo-input"
        placeholder="할 일을 입력하세요..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleSubmit}
        disabled={!inputValue.trim()}
        className="add-button"
      >
        할 일 추가
      </button>
    </div>
  );
};

export default TodoForm;

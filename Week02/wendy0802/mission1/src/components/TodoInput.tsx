import React from "react";
import { useTodo } from "../hooks/useTodo";

const TodoInput: React.FC = () => {
  const { inputText, setInputText, addTodo } = useTodo();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="inputGroup">
      <input
        type="text"
        className="input"
        placeholder="할 일 입력"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="addBtn" onClick={addTodo}>
        할 일 추가
      </button>
    </div>
  );
};

export default TodoInput;

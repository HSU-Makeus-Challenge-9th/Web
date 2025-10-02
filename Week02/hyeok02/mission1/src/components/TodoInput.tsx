import { useState, KeyboardEvent } from "react";
import { useTodoContext } from "../context/UseTodoContext";

export const TodoInput = () => {
  const [text, setText] = useState("");
  const { add } = useTodoContext();

  const handleAdd = () => {
    if (!text.trim()) return;
    add(text);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="todo__controls" role="group" aria-label="할 일 추가">
      <input
        type="text"
        className="todo__input"
        placeholder="할 일 입력"
        aria-label="할 일 입력"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="todo__add-btn" type="button" onClick={handleAdd}>
        할 일 추가
      </button>
    </div>
  );
};

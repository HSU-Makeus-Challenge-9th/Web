import React from "react";
import { Task } from "../types/todo";
import { useTodoContext } from "../context/TodoContext";

type TodoItemProps = {
  task: Task;
  isDone: boolean;
};

const TodoItem = ({ task, isDone }: TodoItemProps) => {
  const { completeTask, deleteTask } = useTodoContext();

  const handleClick = () => {
    if (isDone) {
      deleteTask(task);
    } else {
      completeTask(task);
    }
  };

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button
        className="render-container__item-button"
        onClick={handleClick}
        style={{
          backgroundColor: isDone ? "#dc3545" : "#28a745",
        }}
      >
        {isDone ? "삭제" : "완료"}
      </button>
    </li>
  );
};

export default TodoItem;

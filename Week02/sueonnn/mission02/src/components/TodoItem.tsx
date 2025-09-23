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
    <li className="todo-item">
      <span className="todo-text">{task.text}</span>
      <button
        onClick={handleClick}
        className={`todo-button ${isDone ? "delete-button" : "complete-button"}`}
      >
        {isDone ? "삭제" : "완료"}
      </button>
    </li>
  );
};

export default TodoItem;

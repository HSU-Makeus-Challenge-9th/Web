import React from "react";
import TodoItem from "./TodoItem";
import { useTodoContext } from "../context/TodoContext";

type TodoSectionProps = {
  title: string;
  isDone: boolean;
};

const TodoSection = ({ title, isDone }: TodoSectionProps) => {
  const { todos, doneTasks } = useTodoContext();
  const tasks = isDone ? doneTasks : todos;

  return (
    <div className="todo-section">
      <h2 className="section-title">{title}</h2>
      <ul className="todo-list">
        {tasks.length === 0 ? (
          <li className="empty-state">
            {isDone ? "완료된 할 일이 없습니다" : "할 일을 추가해보세요"}
          </li>
        ) : (
          tasks.map((task) => (
            <TodoItem key={task.id} task={task} isDone={isDone} />
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoSection;

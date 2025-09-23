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
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} isDone={isDone} />
        ))}
      </ul>
    </div>
  );
};

export default TodoSection;

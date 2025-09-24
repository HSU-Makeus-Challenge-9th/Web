import { useMemo } from "react";
import { useTodoContext } from "../context/UseTodoContext";
import { TodoItem } from "./TodoItem";
import type { Todo } from "../types";

export const TodoList = () => {
  const { todos } = useTodoContext();

  const [todoItems, doneItems] = useMemo(() => {
    return todos.reduce<[Todo[], Todo[]]>(
      ([t, d], item) => {
        (item.isDone ? d : t).push(item);
        return [t, d];
      },
      [[], []]
    );
  }, [todos]);

  return (
    <div className="todo__sections">
      <section className="todo__section" aria-labelledby="todo-title">
        <h3 className="todo__section-title" id="todo-title">
          할 일
        </h3>
        <ul className="todo__list todo__list--todo">
          {todoItems.map((t) => (
            <TodoItem key={t.id} todo={t} />
          ))}
        </ul>
      </section>

      <section className="todo__section" aria-labelledby="done-title">
        <h3 className="todo__section-title" id="done-title">
          완료
        </h3>
        <ul className="todo__list todo__list--done">
          {doneItems.map((t) => (
            <TodoItem key={t.id} todo={t} />
          ))}
        </ul>
      </section>
    </div>
  );
};

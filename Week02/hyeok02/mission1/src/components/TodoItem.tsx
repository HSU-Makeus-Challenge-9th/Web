import { memo } from "react";
import type { Todo } from "../types";
import { useTodoContext } from "../context/UseTodoContext";

interface Props {
  todo: Todo;
}

export const TodoItem = memo(({ todo }: Props) => {
  const { complete, remove } = useTodoContext();

  return (
    <li className="todo__item" data-id={String(todo.id)}>
      <span className="todo__item-text">{todo.text}</span>
      {!todo.isDone ? (
        <button
          className="todo__action-btn todo__action-btn--done"
          type="button"
          onClick={() => complete(todo.id)}
        >
          완료
        </button>
      ) : (
        <button
          className="todo__action-btn todo__action-btn--delete"
          type="button"
          onClick={() => remove(todo.id)}
        >
          삭제
        </button>
      )}
    </li>
  );
});

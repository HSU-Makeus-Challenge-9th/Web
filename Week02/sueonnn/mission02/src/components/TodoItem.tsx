import { useTheme } from "../contexts/ThemeContext";
import { useTodoContext } from "../contexts/TodoContext";
import type { Task } from "../types/todo";

type Props = { task: Task; isDone: boolean };

const TodoItem = ({ task, isDone }: Props) => {
  const { completeTask, deleteTask } = useTodoContext();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handle = () => (isDone ? deleteTask(task) : completeTask(task));

  return (
    <li
      className={
        "flex items-center justify-between gap-3 rounded-md px-3 py-2 border " +
        (isLight
          ? "bg-white text-gray-900 border-gray-300"
          : "bg-gray-800 text-gray-100 border-gray-600")
      }
    >
      <span className={isDone ? "line-through opacity-60" : ""}>
        {task.text}
      </span>
      <button
        type="button"
        onClick={handle}
        className={
          "px-3 py-1 rounded-md text-white " +
          (isDone
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-600 hover:bg-green-700")
        }
      >
        {isDone ? "삭제" : "완료"}
      </button>
    </li>
  );
};

export default TodoItem;

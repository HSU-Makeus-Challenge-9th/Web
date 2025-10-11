import TodoItem from "./TodoItem";
import { useTodoContext } from "../contexts/TodoContext";
import { useTheme } from "../contexts/ThemeContext";

type Props = { title: string; isDone: boolean };

const TodoSection = ({ title, isDone }: Props) => {
  const { todos, doneTasks } = useTodoContext();
  const list = isDone ? doneTasks : todos;

  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section>
      <h2
        className={
          "text-lg font-semibold mb-2 " +
          (isLight ? "text-gray-900" : "text-gray-100")
        }
      >
        {title}
      </h2>
      <ul className="space-y-2">
        {list.map((t) => (
          <TodoItem key={t.id} task={t} isDone={isDone} />
        ))}
        {list.length === 0 && (
          <li className={isLight ? "text-gray-500" : "text-gray-400"}>
            항목이 없습니다.
          </li>
        )}
      </ul>
    </section>
  );
};

export default TodoSection;

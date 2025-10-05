import { useTodo } from "../hooks/useTodo";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const { todos } = useTodo();
  return (
    <ul id="todoList">
      {todos.map((todoItem, index) => (
        <TodoItem todo={todoItem} index={index} />
      ))}
    </ul>
  );
};

export default TodoList;

import "./index.css";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { TodoProvider } from "./context/TodoProvider";

function App() {
  return (
    <TodoProvider>
      <div className="todo" role="application" aria-label="YONG TODO">
        <h1 className="todo__title">YONG TODO</h1>
        <TodoInput />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;

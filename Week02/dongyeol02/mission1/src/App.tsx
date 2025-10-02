import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import CompleteList from "./components/CompleteList";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <div id="main-container">
        <header>UMC Study Plan</header>
        <hr />
        <TodoInput />
        <div id="section-container">
          <section id="todo-container">
            <div className="section-header">
              <span className="section-header-span">해야 할 일</span>
            </div>
            <div className="section-content">
              <TodoList />
            </div>
          </section>

          <section id="completed-container">
            <div className="section-header">
              <span className="section-header-span">해낸 일</span>
            </div>
            <div className="section-content">
              <CompleteList />
            </div>
          </section>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

type Todo = { id: number; text: string };

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

/** 렌더링 */
const renderTasks = (): void => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((t) => {
    const li = createTodoElement(t, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach((t) => {
    const li = createTodoElement(t, true);
    doneList.appendChild(li);
  });
};

const getTodoText = (): string => todoInput.value.trim();

/** 추가 */
const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTasks();
};

/** 완료 이동 */
const completeTodo = (todo: Todo): void => {
  todos = todos.filter((t) => t.id !== todo.id);
  doneTasks.unshift(todo);
  renderTasks();
};

/** 삭제 (완료 목록에서만) */
const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  renderTasks();
};

/** 아이템 DOM 생성 */
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement("li");
  li.classList.add("render-container__item");

  const text = document.createElement("span");
  text.classList.add("render-container__item-text");
  text.textContent = todo.text;
  li.appendChild(text);

  const btn = document.createElement("button");
  btn.classList.add("render-container__item-button");

  if (isDone) {
    btn.textContent = "삭제";
    btn.addEventListener("click", () => deleteTodo(todo));
  } else {
    btn.textContent = "완료";
    btn.addEventListener("click", () => completeTodo(todo));
  }

  li.appendChild(btn);
  return li;
};

/** 폼 제출 */
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = getTodoText();
  if (!text) return;
  addTodo(text);
});

/** 초기 렌더 */
renderTasks();

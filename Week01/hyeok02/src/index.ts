interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

let todos: Todo[] = [];

const qs = <T extends Element>(sel: string): T =>
  document.querySelector(sel)! as T;

const input = qs<HTMLInputElement>(".todo__input");
const addBtn = qs<HTMLButtonElement>(".todo__add-btn");
const todoList = qs<HTMLUListElement>(".todo__list--todo");
const doneList = qs<HTMLUListElement>(".todo__list--done");

const createItem = (todo: Todo) => {
  const li = document.createElement("li");
  li.className = "todo__item";
  li.dataset.id = String(todo.id);

  const span = document.createElement("span");
  span.className = "todo__item-text";
  span.textContent = todo.text;

  const btn = document.createElement("button");
  btn.className = `todo__action-btn ${
    todo.isDone ? "todo__action-btn--delete" : "todo__action-btn--done"
  }`;
  btn.textContent = todo.isDone ? "삭제" : "완료";

  li.append(span, btn);
  return li;
};

const render = () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo) =>
    (todo.isDone ? doneList : todoList).appendChild(createItem(todo))
  );
};

const addTodo = () => {
  const text = input.value.trim();
  if (!text) return;

  todos.push({ id: Date.now(), text, isDone: false });
  input.value = "";
  render();
};

const toggleTodo = (id: number) => {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  if (!todo.isDone) {
    todo.isDone = true;
  } else {
    todos = todos.filter((t) => t.id !== id);
  }
  render();
};

const handleListClick = (e: Event) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  const btn = target.closest(
    ".todo__action-btn--done, .todo__action-btn--delete"
  ) as HTMLButtonElement | null;
  if (!btn) return;

  const li = btn.closest(".todo__item") as HTMLLIElement | null;
  if (!li || !li.dataset.id) return;

  toggleTodo(Number(li.dataset.id));
};

[todoList, doneList].forEach((list) =>
  list.addEventListener("click", handleListClick)
);

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

render();

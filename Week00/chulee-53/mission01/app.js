const $taskInput = document.getElementById("taskInput");
const $todoList = document.getElementById("todoList");
const $doneList = document.getElementById("doneList");

$taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const task = $taskInput.value.trim();
  if (!task) return;

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = task;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "완료";
  completeBtn.addEventListener("click", () => completeTodo(li));

  li.append(span, completeBtn);
  todoList.appendChild(li);

  $taskInput.value = "";
  $taskInput.focus();
}

function completeTodo(item) {
  item.classList.add("done");
  const button = item.querySelector("button");
  button.textContent = "삭제";
  button.addEventListener("click", () => deleteTodo(item), { once: true });
  $doneList.appendChild(item);
}

function deleteTodo(item) {
  item.remove();
}

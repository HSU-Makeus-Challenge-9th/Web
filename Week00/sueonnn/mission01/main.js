// ====== DOM 캐시 ======
const template = document.getElementById("task-template");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const input = document.getElementById("task-input");

// ====== 로컬 스토리지 관련 함수 ======
function saveTasks() {
  const todoTasks = Array.from(
    todoList.querySelectorAll(".task:not(.empty)")
  ).map((task) => ({
    title: task.querySelector(".task__title").textContent,
    completed: false,
  }));

  const doneTasks = Array.from(
    doneList.querySelectorAll(".task:not(.empty)")
  ).map((task) => ({
    title: task.querySelector(".task__title").textContent,
    completed: true,
  }));

  localStorage.setItem(
    "umcTasks",
    JSON.stringify([...todoTasks, ...doneTasks])
  );
}

function loadTasks() {
  const savedTasks = localStorage.getItem("umcTasks");
  if (!savedTasks) return;

  try {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((taskData) => {
      const task = makeTask(taskData.title);
      if (taskData.completed) {
        task.classList.add("task--done");
        const completeBtn = task.querySelector(".btn--complete");
        if (completeBtn) completeBtn.remove();
        doneList.appendChild(task);
      } else {
        todoList.appendChild(task);
      }
    });
  } catch (error) {
    console.error("저장된 데이터를 불러오는데 실패했습니다:", error);
  }
}

function ensureEmptyPlaceholders() {
  const todoTasks = todoList.querySelectorAll(".task:not(.empty)");
  if (todoTasks.length === 0) {
    let emptyItem = todoList.querySelector(".empty");
    if (!emptyItem) {
      emptyItem = document.createElement("li");
      emptyItem.className = "empty";
      todoList.appendChild(emptyItem);
    }
  } else {
    const emptyItem = todoList.querySelector(".empty");
    if (emptyItem) emptyItem.remove();
  }

  const doneTasks = doneList.querySelectorAll(".task:not(.empty)");
  if (doneTasks.length === 0) {
    let emptyItem = doneList.querySelector(".empty");
    if (!emptyItem) {
      emptyItem = document.createElement("li");
      emptyItem.className = "empty";
      doneList.appendChild(emptyItem);
    }
  } else {
    const emptyItem = doneList.querySelector(".empty");
    if (emptyItem) emptyItem.remove();
  }
}

function makeTask(title) {
  const node = template.content.firstElementChild.cloneNode(true);
  node.querySelector(".task__title").textContent = title;
  return node;
}

function addTodo(title) {
  const trimmed = title.trim();
  if (!trimmed) return;
  const task = makeTask(trimmed);
  todoList.appendChild(task);
  ensureEmptyPlaceholders();
  saveTasks();
}

function completeTask(taskEl) {
  taskEl.classList.add("task--done");
  const completeBtn = taskEl.querySelector(".btn--complete");
  if (completeBtn) completeBtn.remove();
  doneList.appendChild(taskEl);
  ensureEmptyPlaceholders();
  saveTasks();
}

function deleteTask(taskEl) {
  taskEl.remove();
  ensureEmptyPlaceholders();
  saveTasks();
}

// ====== 이벤트 바인딩 ======
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.isComposing) {
    addTodo(input.value);
    input.value = "";
  }
});

document.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.classList.contains("btn--complete")) {
    const taskEl = target.closest(".task");
    if (taskEl) completeTask(taskEl);
  }

  if (target.classList.contains("btn--delete")) {
    const taskEl = target.closest(".task");
    if (taskEl) deleteTask(taskEl);
  }
});

// ====== 초기화 ======
loadTasks();
ensureEmptyPlaceholders();

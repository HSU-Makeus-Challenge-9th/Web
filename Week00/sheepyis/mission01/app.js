document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const todoList = document.getElementById("todoList");
  const doneList = document.getElementById("doneList");

  // 기존 데이터 로드(새로고침)
  loadTodos();

  // input 이벤트 리스너(엔터)
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && input.value.trim() !== "") {
      addTodo(input.value.trim());
      input.value = "";
    }
  });

  // 공통 item 정의
  function createItem(text, buttonText, buttonCallback) {
    const item = document.createElement("div");
    item.classList.add("todo-item");

    const textBox = document.createElement("span");
    textBox.textContent = text;

    const button = document.createElement("button");
    button.textContent = buttonText;
    button.addEventListener("click", buttonCallback);

    item.appendChild(textBox);
    item.appendChild(button);

    return item;
  }

  // 추가 함수 정의
  function addTodo(text) {
    const item = createItem(text, "완료", () => completeTodo(item, text));
    todoList.appendChild(item);
    saveTodos();
  }

  // 이동 함수 정의
  function completeTodo(item, text) {
    // 기존 item 초기화
    item.innerHTML = "";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => deleteTodo(item));

    const textBox = document.createElement("span");
    textBox.textContent = text;

    item.appendChild(textBox);
    item.appendChild(deleteButton);
    doneList.appendChild(item);
    saveTodos();
  }

  // 삭제 함수 정의
  function deleteTodo(item) {
    item.remove();
    saveTodos();
  }

  // 로컬 스토리지 저장 함수 정의
  function saveTodos() {
    const todos = [];
    const doneTodos = [];

    todoList.querySelectorAll(".todo-item").forEach((item) => {
      const text = item.querySelector("span").textContent;
      todos.push(text);
    });

    doneList.querySelectorAll(".todo-item").forEach((item) => {
      const text = item.querySelector("span").textContent;
      doneTodos.push(text);
    });

    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
  }

  // 로드 함수 정의
  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const doneTodos = JSON.parse(localStorage.getItem("doneTodos")) || [];

    todos.forEach((text) => {
      const item = createItem(text, "완료", () => completeTodo(item, text));
      todoList.appendChild(item);
    });

    doneTodos.forEach((text) => {
      const item = createItem(text, "삭제", () => deleteTodo(item));
      doneList.appendChild(item);
    });
  }
});

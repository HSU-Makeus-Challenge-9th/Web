const todoList = document.getElementById("todoList") as HTMLUListElement;
const completeList = document.getElementById(
  "completeList"
) as HTMLUListElement;
const todoInput = document.getElementById("todoInput") as HTMLInputElement;

todoInput.addEventListener("keypress", function (e: KeyboardEvent): void {
  if (e.key === "Enter") {
    addTodo();
  }
});

const addTodo = (): void => {
  const todoText: String = todoInput.value.trim();

  // 빈 입력일 경우 예외처리!
  if (todoText === "") {
    alert("할 일을 입력해주세요!");
    return;
  }
  // 최대 30글자
  if (todoText.length > 30) {
    alert("할 일은 30자 이내로 입력해주세요!");
    return;
  }
  const li: HTMLLIElement = document.createElement("li");
  li.innerHTML = `<span>${todoText}</span><button onclick="completeTodo(this)">완료</button>`;
  todoList.appendChild(li);
  todoInput.value = "";
  alert("할 일이 추가되었습니다!");
};

const completeTodo = (button: HTMLButtonElement): void => {
  const completeLi: HTMLLIElement = button.parentElement as HTMLLIElement;
  const li = document.createElement("li");
  const todoText: String = (completeLi.querySelector("span") as HTMLSpanElement)
    .innerText;
  li.innerHTML = `<span>${todoText}</span><button onclick="d₩eleteTodo(this)">삭제</button>`;
  completeList.appendChild(li);
  completeLi.remove();
  alert("해야 할 일이 완료되었습니다!");
};

const deleteTodo = (button: HTMLButtonElement) => {
  const deleteLi: HTMLLIElement = button.parentElement as HTMLLIElement;
  deleteLi.remove();
  alert("한 일이 삭제되었습니다!");
};

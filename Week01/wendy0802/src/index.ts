const inputEl = document.querySelector("input") as HTMLInputElement;
const addButton = document.querySelector(".addButton") as HTMLButtonElement;
const todoSection = document.querySelector("#todoSection") as HTMLElement;  // 대소문자 일치
const doneSection = document.querySelector("#doneSection") as HTMLElement;  // 대소문자 일치

function addTodo(): void {
    const text = inputEl.value.trim();
    if (text === "") return;

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");

    const p = document.createElement("p");
    p.classList.add("todo-text");
    p.textContent = text;

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("doneButton");
    doneBtn.textContent = "완료";  // 한글 텍스트 수정
    doneBtn.addEventListener("click", () => moveToDone(todoDiv, text));

    todoDiv.appendChild(p);
    todoDiv.appendChild(doneBtn);
    todoSection.appendChild(todoDiv);

    inputEl.value = "";
}

function moveToDone(todoDiv: HTMLDivElement, text: string): void {
    todoDiv.remove();

    const doneDiv = document.createElement("div");
    doneDiv.classList.add("todo-item");

    const p = document.createElement("p");
    p.classList.add("todo-text");
    p.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteButton");
    deleteBtn.textContent = "삭제";  
    deleteBtn.addEventListener("click", () => doneDiv.remove());

    doneDiv.appendChild(p);
    doneDiv.appendChild(deleteBtn);
    doneSection.appendChild(doneDiv);
}

addButton?.addEventListener("click", addTodo);
inputEl?.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "Enter") addTodo();
});
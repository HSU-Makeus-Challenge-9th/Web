"use strict";
const inputEl = document.querySelector("input");
const addButton = document.querySelector(".addButton");
const todosection = document.querySelector("#todoSection");
const donesection = document.querySelector("#doneSection");
function addTodo() {
    const text = inputEl.value.trim();
    if (text === "")
        return;
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    const p = document.createElement("p");
    p.classList.add("todo-text");
    p.textContent = text;
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("doneButton");
    doneBtn.textContent = "완료";
    doneBtn.addEventListener("click", () => moveToDone(todoDiv, text));
    todoDiv.appendChild(p);
    todoDiv.appendChild(doneBtn);
    todosection.appendChild(todoDiv);
    inputEl.value = "";
}
function moveToDone(todoDiv, text) {
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
    donesection.appendChild(doneDiv);
}
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", addTodo);
inputEl === null || inputEl === void 0 ? void 0 : inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter")
        addTodo();
});

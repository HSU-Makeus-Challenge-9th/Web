"use strict";
const $input = document.querySelector("input");
const $todoList = document.getElementById("todoList");
const $doneList = document.getElementById("doneList");
if (!$input || !$todoList || !$doneList) {
    throw new Error("필수 DOM 요소를 찾을 수 없습니다.");
}
loadTodos();
$input.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && $input.value.trim() !== "") {
        addTodo($input.value.trim());
        $input.value = "";
    }
});
function createItem(text, buttonText, buttonCallback) {
    const $item = document.createElement("div");
    $item.classList.add("todo-item");
    const $textBox = document.createElement("span");
    $textBox.textContent = text;
    const $button = document.createElement("button");
    $button.textContent = buttonText;
    $button.addEventListener("click", buttonCallback);
    $item.appendChild($textBox);
    $item.appendChild($button);
    return $item;
}
function addTodo(text) {
    const $item = createItem(text, "완료", () => completeTodo($item, text));
    $todoList === null || $todoList === void 0 ? void 0 : $todoList.appendChild($item);
    saveTodos();
}
function completeTodo($item, text) {
    $item.innerHTML = "";
    const $deleteButton = document.createElement("button");
    $deleteButton.textContent = "삭제";
    $deleteButton.addEventListener("click", () => deleteTodo($item));
    const $textBox = document.createElement("span");
    $textBox.textContent = text;
    $item.appendChild($textBox);
    $item.appendChild($deleteButton);
    $doneList === null || $doneList === void 0 ? void 0 : $doneList.appendChild($item);
    saveTodos();
}
function deleteTodo($item) {
    $item.remove();
    saveTodos();
}
function saveTodos() {
    const todos = [];
    const doneTodos = [];
    $todoList === null || $todoList === void 0 ? void 0 : $todoList.querySelectorAll(".todo-item").forEach(($item) => {
        var _a, _b;
        const text = (_b = (_a = $item.querySelector("span")) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : "";
        todos.push(text);
    });
    $doneList === null || $doneList === void 0 ? void 0 : $doneList.querySelectorAll(".todo-item").forEach(($item) => {
        var _a, _b;
        const text = (_b = (_a = $item.querySelector("span")) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : "";
        doneTodos.push(text);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
}
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const doneTodos = JSON.parse(localStorage.getItem("doneTodos") || "[]");
    todos.forEach((text) => {
        const $item = createItem(text, "완료", () => completeTodo($item, text));
        $todoList === null || $todoList === void 0 ? void 0 : $todoList.appendChild($item);
    });
    doneTodos.forEach((text) => {
        const $item = createItem(text, "삭제", () => deleteTodo($item));
        $doneList === null || $doneList === void 0 ? void 0 : $doneList.appendChild($item);
    });
}

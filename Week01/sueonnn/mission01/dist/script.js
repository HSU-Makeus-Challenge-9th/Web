"use strict";
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todos = [];
let doneTasks = [];
const renderTasks = () => {
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
const getTodoText = () => todoInput.value.trim();
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = "";
    renderTasks();
};
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.unshift(todo);
    renderTasks();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};
const createTodoElement = (todo, isDone) => {
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
    }
    else {
        btn.textContent = "완료";
        btn.addEventListener("click", () => completeTodo(todo));
    }
    li.appendChild(btn);
    return li;
};
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = getTodoText();
    if (!text)
        return;
    addTodo(text);
});
renderTasks();

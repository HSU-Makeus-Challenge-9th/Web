"use strict";
const $todoBtn = document.querySelector('.todo__button');
const $todoInput = document.querySelector('.todo__input');
const $todoList = document.querySelector('.todo__todoList');
const $doneList = document.querySelector('.todo__doneList');
let todos = [];
let dones = [];
function saveLists() {
    localStorage.setItem('todos_key', JSON.stringify(todos));
    localStorage.setItem('dones_key', JSON.stringify(dones));
}
function loadList() {
    const savedTodos = localStorage.getItem('todos_key');
    const savedDones = localStorage.getItem('dones_key');
    todos = savedTodos ? JSON.parse(savedTodos) : [];
    dones = savedDones ? JSON.parse(savedDones) : [];
}
const createTodoItem = (text, isDone) => {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo__item';
    const todoText = document.createElement('span');
    todoText.className = 'todo__text';
    todoText.textContent = text;
    const todoBtn = document.createElement('button');
    if (isDone) {
        todoBtn.className = 'todo__button delete';
        todoBtn.textContent = '삭제';
    }
    else {
        todoBtn.className = 'todo__button done';
        todoBtn.textContent = '완료';
    }
    todoBtn.addEventListener('click', doneToDelete);
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoBtn);
    return todoItem;
};
const addTodo = () => {
    if (!$todoInput || !$todoList)
        return;
    const newTodoText = $todoInput.value.trim();
    todos.push(newTodoText);
    saveLists();
    const newTodoItem = createTodoItem(newTodoText, false);
    $todoList.appendChild(newTodoItem);
    $todoInput.value = '';
    $todoInput.focus();
};
function doneToDelete(e) {
    const actionBtn = e.target;
    const todoItem = actionBtn.parentElement;
    const $todoText = todoItem === null || todoItem === void 0 ? void 0 : todoItem.querySelector('.todo__text');
    const text = $todoText.textContent || '';
    if (!todoItem || !$doneList)
        return;
    if (actionBtn.textContent === '완료') {
        todos = todos.filter(todo => todo !== text);
        dones.push(text);
        $doneList === null || $doneList === void 0 ? void 0 : $doneList.appendChild(todoItem);
        actionBtn.textContent = '삭제';
        actionBtn.className = 'todo__button delete';
    }
    else {
        dones = dones.filter(done => done !== text);
        todoItem.remove();
    }
    saveLists();
}
function initialRender() {
    if (!$todoList || !$doneList)
        return;
    todos.forEach(todoText => {
        const todoItem = createTodoItem(todoText, false);
        $todoList.appendChild(todoItem);
    });
    dones.forEach(doneText => {
        const doneItem = createTodoItem(doneText, true);
        $doneList.appendChild(doneItem);
    });
}
$todoBtn === null || $todoBtn === void 0 ? void 0 : $todoBtn.addEventListener("click", addTodo);
$todoInput === null || $todoInput === void 0 ? void 0 : $todoInput.addEventListener('keydown', (e) => {
    var _a;
    if (e.key == 'Enter' && ((_a = $todoInput.value) === null || _a === void 0 ? void 0 : _a.trim()) != '') {
        addTodo();
    }
});
loadList();
initialRender();

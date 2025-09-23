"use strict";
class TodoApp {
    constructor(todoInput, addButton, todoList, completedList) {
        this.todos = [];
        this.$todoInput = todoInput;
        this.$addButton = addButton;
        this.$todoList = todoList;
        this.$completedList = completedList;
        this.init();
        this.render();
    }
    init() {
        this.$addButton.addEventListener('click', () => this.addTodo());
        this.$todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
    }
    addTodo() {
        const text = this.$todoInput.value.trim();
        if (text === '') {
            alert('할 일을 입력해주세요!');
            return;
        }
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        this.todos.push(newTodo);
        this.$todoInput.value = '';
        this.render();
    }
    completeTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
            this.render();
        }
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.render();
    }
    createCompleteButton(todoId) {
        const button = document.createElement('button');
        button.className = 'todo-item__button todo-item__button--complete';
        button.textContent = '완료';
        button.addEventListener('click', () => this.completeTodo(todoId));
        return button;
    }
    createDeleteButton(todoId) {
        const button = document.createElement('button');
        button.className = 'todo-item__button todo-item__button--delete';
        button.textContent = '삭제';
        button.addEventListener('click', () => this.deleteTodo(todoId));
        return button;
    }
    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        const span = document.createElement('span');
        span.className = 'todo-item__text';
        span.textContent = todo.text;
        const completeButton = this.createCompleteButton(todo.id);
        li.appendChild(span);
        li.appendChild(completeButton);
        return li;
    }
    createCompletedElement(todo) {
        const li = document.createElement('li');
        li.className = 'completed-item';
        const span = document.createElement('span');
        span.className = 'completed-item__text';
        span.textContent = todo.text;
        const deleteButton = this.createDeleteButton(todo.id);
        li.appendChild(span);
        li.appendChild(deleteButton);
        return li;
    }
    render() {
        this.$todoList.innerHTML = '';
        this.$completedList.innerHTML = '';
        const incompleteTodos = this.todos.filter(todo => !todo.completed);
        const completedTodos = this.todos.filter(todo => todo.completed);
        if (incompleteTodos.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            this.$todoList.appendChild(emptyMessage);
        }
        else {
            incompleteTodos.forEach(todo => {
                const todoElement = this.createTodoElement(todo);
                this.$todoList.appendChild(todoElement);
            });
        }
        if (completedTodos.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            this.$completedList.appendChild(emptyMessage);
        }
        else {
            completedTodos.forEach(todo => {
                const completedElement = this.createCompletedElement(todo);
                this.$completedList.appendChild(completedElement);
            });
        }
    }
}
function initializeTodoApp() {
    const todoInput = document.querySelector('#todo-input');
    const addButton = document.querySelector('#add-button');
    const todoList = document.querySelector('#todo-list');
    const completedList = document.querySelector('#completed-list');
    if (!todoInput || !addButton || !todoList || !completedList) {
        return;
    }
    new TodoApp(todoInput, addButton, todoList, completedList);
}
document.addEventListener('DOMContentLoaded', initializeTodoApp);

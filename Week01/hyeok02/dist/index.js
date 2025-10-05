"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var todos = [];
  var input = document.querySelector(".todo__input");
  var addBtn = document.querySelector(".todo__add-btn");
  var todoList = document.querySelector(".todo__list--todo");
  var doneList = document.querySelector(".todo__list--done");

  if (!input || !addBtn || !todoList || !doneList) {
    console.error("[INIT ERROR] 필수 요소 누락");
    return;
  }

  function createItem(todo) {
    var li = document.createElement("li");
    li.className = "todo__item";
    li.dataset.id = String(todo.id);

    var span = document.createElement("span");
    span.className = "todo__item-text";
    span.textContent = todo.text;

    var btn = document.createElement("button");
    btn.className =
      "todo__action-btn " +
      (todo.isDone ? "todo__action-btn--delete" : "todo__action-btn--done");
    btn.textContent = todo.isDone ? "삭제" : "완료";

    li.appendChild(span);
    li.appendChild(btn);
    return li;
  }

  function renderTodos() {
    var fragTodo = document.createDocumentFragment();
    var fragDone = document.createDocumentFragment();

    for (var i = 0; i < todos.length; i++) {
      var todo = todos[i];
      var item = createItem(todo);
      (todo.isDone ? fragDone : fragTodo).appendChild(item);
    }

    todoList.replaceChildren(fragTodo);
    doneList.replaceChildren(fragDone);
  }

  function addTodo() {
    var text = input.value.trim();
    if (!text) return;

    todos.push({ id: Date.now(), text: text, isDone: false });
    input.value = "";
    renderTodos();
  }

  function toggleById(id) {
    var idx = todos.findIndex(function (t) {
      return t.id === id;
    });
    if (idx === -1) return;

    var t = todos[idx];
    if (!t.isDone) {
      todos[idx] = { id: t.id, text: t.text, isDone: true };
    } else {
      todos.splice(idx, 1);
    }
    renderTodos();
  }

  function handleListClick(e) {
    var target = e.target;
    if (!(target instanceof Element)) return;

    var btn = target.closest(".todo__action-btn");
    if (!btn) return;

    var li = btn.closest(".todo__item");
    if (!li || !li.dataset.id) return;

    toggleById(Number(li.dataset.id));
  }

  todoList.addEventListener("click", handleListClick);
  doneList.addEventListener("click", handleListClick);

  addBtn.addEventListener("click", addTodo);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addTodo();
  });

  renderTodos();
});

"use strict";
const todoList = document.getElementById("todoList");
const completeList = document.getElementById("completeList");
const todoInput = document.getElementById("todoInput");
todoInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});
const addTodo = () => {
    const todoText = todoInput.value.trim();
    if (todoText === "") {
        alert("할 일을 입력해주세요!");
        return;
    }
    if (todoText.length > 30) {
        alert("할 일은 30자 이내로 입력해주세요!");
        return;
    }
    const li = document.createElement("li");
    li.innerHTML = `<span>${todoText}</span><button onclick="completeTodo(this)">완료</button>`;
    todoList.appendChild(li);
    todoInput.value = "";
    alert("할 일이 추가되었습니다!");
};
const completeTodo = (button) => {
    const completeLi = button.parentElement;
    const li = document.createElement("li");
    const todoText = completeLi.querySelector("span")
        .innerText;
    li.innerHTML = `<span>${todoText}</span><button onclick="deleteTodo(this)">삭제</button>`;
    completeList.appendChild(li);
    completeLi.remove();
    alert("해야 할 일이 완료되었습니다!");
};
const deleteTodo = (button) => {
    const deleteLi = button.parentElement;
    deleteLi.remove();
    alert("한 일이 삭제되었습니다!");
};

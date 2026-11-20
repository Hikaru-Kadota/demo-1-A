import { addTodo, deleteTodo, toggleTodo } from "./todos.mjs";

const storageKey = "demo-1-a-todos";
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const count = document.querySelector("#todo-count");
const emptyState = document.querySelector("#empty-state");

function loadTodos() {
  try {
    const storedTodos = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(storedTodos) ? storedTodos : [];
  } catch {
    return [];
  }
}

let todos = loadTodos();

function saveAndRender() {
  localStorage.setItem(storageKey, JSON.stringify(todos));
  render();
}

function render() {
  list.replaceChildren();

  for (const todo of todos) {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `「${todo.title}」を完了にする`);
    checkbox.addEventListener("change", () => {
      todos = toggleTodo(todos, todo.id);
      saveAndRender();
    });

    const title = document.createElement("span");
    title.className = "todo-title";
    title.textContent = todo.title;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "削除";
    deleteButton.setAttribute("aria-label", `「${todo.title}」を削除`);
    deleteButton.addEventListener("click", () => {
      todos = deleteTodo(todos, todo.id);
      saveAndRender();
    });

    item.append(checkbox, title, deleteButton);
    list.append(item);
  }

  const remaining = todos.filter((todo) => !todo.completed).length;
  count.textContent = `${remaining} / ${todos.length} 件が未完了`;
  emptyState.hidden = todos.length > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  todos = addTodo(todos, input.value, crypto.randomUUID());
  saveAndRender();
  input.value = "";
  input.focus();
});

render();

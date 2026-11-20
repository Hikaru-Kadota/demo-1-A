import { addTodo, deleteTodo, toggleTodo } from "./todos.mjs";

const storageKey = "demo-1-a-todos";
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const count = document.querySelector("#todo-count");

function readTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    if (!Array.isArray(savedTodos)) {
      return [];
    }

    return savedTodos.filter(
      (todo) =>
        todo &&
        typeof todo.id === "string" &&
        typeof todo.title === "string" &&
        typeof todo.completed === "boolean",
    );
  } catch {
    return [];
  }
}

let todos = readTodos();

function saveTodos() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  } catch {
    // The app remains usable for the current page if browser storage is unavailable.
  }
}

function renderTodos() {
  list.replaceChildren();

  for (const todo of todos) {
    const item = document.createElement("li");
    item.className = "todo-item";
    if (todo.completed) {
      item.classList.add("is-completed");
    }

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `${todo.title}を完了にする`);
    checkbox.addEventListener("change", () => {
      todos = toggleTodo(todos, todo.id);
      saveTodos();
      renderTodos();
    });

    const title = document.createElement("span");
    title.className = "todo-title";
    title.textContent = todo.title;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "削除";
    deleteButton.setAttribute("aria-label", `${todo.title}を削除`);
    deleteButton.addEventListener("click", () => {
      todos = deleteTodo(todos, todo.id);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, title, deleteButton);
    list.append(item);
  }

  const remainingTodos = todos.filter((todo) => !todo.completed).length;
  count.textContent = `${remainingTodos}件 / ${todos.length}件`;
  emptyState.hidden = todos.length > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  todos = addTodo(todos, input.value, crypto.randomUUID());
  saveTodos();
  renderTodos();
  input.value = "";
  input.focus();
});

renderTodos();

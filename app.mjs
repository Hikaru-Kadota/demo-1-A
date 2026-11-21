import {
  addTodo,
  completeTodo,
  deleteTodo,
  MAX_TITLE_LENGTH,
  MAX_TODOS,
} from "./todos.mjs";

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
        (typeof todo.isCompleted === "boolean" ||
          typeof todo.completed === "boolean"),
    ).map((todo) => ({
      id: todo.id,
      title: todo.title,
      isCompleted: todo.isCompleted ?? todo.completed,
    }));
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
    if (todo.isCompleted) {
      item.classList.add("is-completed");
    }

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.disabled = todo.isCompleted;
    checkbox.setAttribute(
      "aria-label",
      todo.isCompleted ? `${todo.title}（完了済み）` : `${todo.title}を完了にする`,
    );
    checkbox.addEventListener("change", () => {
      todos = completeTodo(todos, todo.id);
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

  const completedTodos = todos.filter((todo) => todo.isCompleted).length;
  count.textContent = `${todos.length}件 / 完了 ${completedTodos}件`;
  emptyState.hidden = todos.length > 0;
}

function showInputError(message) {
  input.setAttribute("aria-invalid", "true");
  document.querySelector("#todo-error").textContent = message;
  input.focus();
}

input.addEventListener("input", () => {
  input.removeAttribute("aria-invalid");
  document.querySelector("#todo-error").textContent = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    showInputError("TODOを入力してください。");
    return;
  }
  if (title.length > MAX_TITLE_LENGTH) {
    showInputError("タイトルは40文字以内で入力してください");
    return;
  }
  if (todos.length >= MAX_TODOS) {
    showInputError("TODOは最大20件まで登録できます");
    return;
  }

  todos = addTodo(todos, title, crypto.randomUUID());
  saveTodos();
  renderTodos();
  input.removeAttribute("aria-invalid");
  document.querySelector("#todo-error").textContent = "";
  input.value = "";
  input.focus();
});

renderTodos();

import assert from "node:assert/strict";
import test from "node:test";
import { addTodo, deleteTodo, toggleTodo } from "../todos.mjs";

test("adds a trimmed, incomplete TODO", () => {
  assert.deepEqual(addTodo([], "  Buy milk  ", "todo-1"), [
    { id: "todo-1", title: "Buy milk", completed: false },
  ]);
});

test("does not add an empty TODO", () => {
  const todos = [{ id: "todo-1", title: "Existing", completed: false }];
  assert.equal(addTodo(todos, "   ", "todo-2"), todos);
});

test("toggles only the matching TODO", () => {
  const todos = [
    { id: "todo-1", title: "First", completed: false },
    { id: "todo-2", title: "Second", completed: true },
  ];

  assert.deepEqual(toggleTodo(todos, "todo-1"), [
    { id: "todo-1", title: "First", completed: true },
    { id: "todo-2", title: "Second", completed: true },
  ]);
});

test("deletes only the matching TODO", () => {
  const todos = [
    { id: "todo-1", title: "First", completed: false },
    { id: "todo-2", title: "Second", completed: true },
  ];

  assert.deepEqual(deleteTodo(todos, "todo-1"), [
    { id: "todo-2", title: "Second", completed: true },
  ]);
});

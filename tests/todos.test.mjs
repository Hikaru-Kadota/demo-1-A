import assert from "node:assert/strict";
import test from "node:test";

import { addTodo, deleteTodo, toggleTodo } from "../todos.mjs";

test("adds a trimmed, incomplete TODO", () => {
  assert.deepEqual(addTodo([], "  牛乳を買う  ", "todo-1"), [
    { id: "todo-1", title: "牛乳を買う", completed: false },
  ]);
});

test("does not add an empty TODO", () => {
  const todos = [{ id: "todo-1", title: "既存", completed: false }];
  assert.equal(addTodo(todos, "   ", "todo-2"), todos);
});

test("toggles completion without changing other TODOs", () => {
  const todos = [
    { id: "todo-1", title: "買い物", completed: false },
    { id: "todo-2", title: "掃除", completed: false },
  ];

  assert.deepEqual(toggleTodo(todos, "todo-1"), [
    { id: "todo-1", title: "買い物", completed: true },
    { id: "todo-2", title: "掃除", completed: false },
  ]);
});

test("deletes only the selected TODO", () => {
  const todos = [
    { id: "todo-1", title: "買い物", completed: false },
    { id: "todo-2", title: "掃除", completed: false },
  ];

  assert.deepEqual(deleteTodo(todos, "todo-1"), [
    { id: "todo-2", title: "掃除", completed: false },
  ]);
});

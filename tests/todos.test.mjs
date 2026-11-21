import assert from "node:assert/strict";
import test from "node:test";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  MAX_TITLE_LENGTH,
  MAX_TODOS,
} from "../todos.mjs";

test("adds a trimmed, incomplete TODO", () => {
  assert.deepEqual(addTodo([], "  Buy milk  ", "todo-1"), [
    { id: "todo-1", title: "Buy milk", isCompleted: false },
  ]);
});

test("does not add an empty TODO", () => {
  const todos = [{ id: "todo-1", title: "Existing", isCompleted: false }];
  assert.equal(addTodo(todos, "   ", "todo-2"), todos);
});

test("accepts a 40-character title and rejects a 41-character title", () => {
  const accepted = addTodo([], "a".repeat(MAX_TITLE_LENGTH), "todo-1");
  assert.equal(accepted.length, 1);
  assert.equal(accepted[0].title.length, 40);
  assert.equal(addTodo([], "a".repeat(41), "todo-2").length, 0);
});

test("applies the title length limit after trimming whitespace", () => {
  assert.equal(addTodo([], ` ${"a".repeat(40)} `, "todo-1").length, 1);
  assert.equal(addTodo([], ` ${"a".repeat(41)} `, "todo-2").length, 0);
});

test("allows duplicate titles as separate TODOs", () => {
  const first = addTodo([], "Same title", "todo-1");
  const second = addTodo(first, "Same title", "todo-2");

  assert.equal(second.length, 2);
  assert.notEqual(second[0].id, second[1].id);
});

test("allows 20 TODOs and rejects a 21st until one is deleted", () => {
  const todos = Array.from({ length: MAX_TODOS }, (_, index) => ({
    id: `todo-${index}`,
    title: `Task ${index}`,
    isCompleted: index % 2 === 0,
  }));
  assert.equal(addTodo(todos, "Last task", "todo-20"), todos);

  const remaining = deleteTodo(todos, "todo-0");
  assert.equal(addTodo(remaining, "Last task", "todo-20").length, MAX_TODOS);
});

test("completes only the matching TODO and is idempotent", () => {
  const todos = [
    { id: "todo-1", title: "First", isCompleted: false },
    { id: "todo-2", title: "Second", isCompleted: true },
  ];

  const completed = completeTodo(todos, "todo-1");
  assert.deepEqual(completed, [
    { id: "todo-1", title: "First", isCompleted: true },
    { id: "todo-2", title: "Second", isCompleted: true },
  ]);
  assert.equal(completeTodo(completed, "todo-1"), completed);
  assert.equal(completeTodo(todos, "missing"), todos);
});

test("deletes only the matching TODO", () => {
  const todos = [
    { id: "todo-1", title: "First", isCompleted: false },
    { id: "todo-2", title: "Second", isCompleted: true },
  ];

  assert.deepEqual(deleteTodo(todos, "todo-1"), [
    { id: "todo-2", title: "Second", isCompleted: true },
  ]);
  assert.equal(deleteTodo(todos, "missing"), todos);
});

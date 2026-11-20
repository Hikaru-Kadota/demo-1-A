export const MAX_TITLE_LENGTH = 40;
export const MAX_TODOS = 20;

export function addTodo(todos, title, id) {
  const trimmedTitle = title.trim();
  if (
    !trimmedTitle ||
    trimmedTitle.length > MAX_TITLE_LENGTH ||
    todos.length >= MAX_TODOS
  ) {
    return todos;
  }

  return [...todos, { id, title: trimmedTitle, isCompleted: false }];
}

export function completeTodo(todos, id) {
  const target = todos.find((todo) => todo.id === id);
  if (!target || target.isCompleted) {
    return todos;
  }

  return todos.map((todo) =>
    todo.id === id ? { ...todo, isCompleted: true } : todo,
  );
}

export function deleteTodo(todos, id) {
  if (!todos.some((todo) => todo.id === id)) {
    return todos;
  }

  return todos.filter((todo) => todo.id !== id);
}

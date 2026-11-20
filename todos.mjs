export function addTodo(todos, title, id) {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    return todos;
  }

  return [...todos, { id, title: trimmedTitle, completed: false }];
}

export function toggleTodo(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
}

export function deleteTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

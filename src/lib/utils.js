export function filterTodos(filter, todos) {
  if (filter) {
    return todos.filter((todo) => todo.isComplete === (filter === "completed"));
  }

  return todos;
}

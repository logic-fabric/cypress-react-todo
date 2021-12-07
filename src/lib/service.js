import axios from "axios";

export function loadTodos() {
  return axios.get("http://localhost:3030/api/todos");
}

export function saveTodo(todo) {
  return axios.post("http://localhost:3030/api/todos", todo);
}

export function deleteTodo(todoId) {
  return axios.delete(`http://localhost:3030/api/todos/${todoId}`);
}

export function updateTodo(todo) {
  return axios.put(`http://localhost:3030/api/todos/${todo.id}`, todo);
}

import axios from "axios";

export function saveTodo(todo) {
  return axios.post("http://localhost:3030/api/todos", todo);
}

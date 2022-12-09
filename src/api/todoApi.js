import axios from "axios";

export const todoApi = axios.create({
  baseUrl: "http://localhost:4000",
});

//add todos
export const addTodos = async (todo) => {
  return await axios.post("http://localhost:4000/tasks", todo);
};

//patch
export const updateTodo = async (todo) => {
  return await axios.patch(`http://localhost:4000/tasks/${todo.id}`, todo);
};

//delete
export const removeTodo = async ({ id }) => {
  return await axios.delete(`http://localhost:4000/tasks/${id}`, id);
};

export const editTodos = ({ id, text }) => {
  return axios.put(`http://localhost:4000/tasks/${id}`, { text });
};

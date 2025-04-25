import axios from "axios";

const fetchTodos = async () => {
  const localToken = localStorage.getItem("token");

  const response = await axios({
    method: "GET",
    url: `${import.meta.env.VITE_API_URL}/todos`,
    headers: {
      "Content-Type": "application/json",
      ...(localToken && { Authorization: `Bearer ${localToken}` }),
    },
  });

  const data = response.data;

  return data;
};

const createTodo = async (newTodo) => {
  const localToken = localStorage.getItem("token");

  const response = await axios({
    method: "POST",
    url: `${import.meta.env.VITE_API_URL}/todos`,
    data: newTodo,
    headers: {
      "Content-Type": "application/json",
      ...(localToken && { Authorization: `Bearer ${localToken}` }),
    },
  });

  const data = response.data;

  return data;
};

const deleteTodo = async (todoId) => {
  const localToken = localStorage.getItem("token");

  const response = await axios({
    method: "DELETE",
    url: `${import.meta.env.VITE_API_URL}/todos/${todoId}`,
    headers: {
      "Content-Type": "application/json",
      ...(localToken && { Authorization: `Bearer ${localToken}` }),
    },
  });

  const data = response.data;

  return data;
};

const updateTodo = async (updatedTodo) => {
  const localToken = localStorage.getItem("token");

  const response = await axios({
    method: "PATCH",
    url: `${import.meta.env.VITE_API_URL}/todos/${updatedTodo._id}`,
    data: { ...updatedTodo },
    headers: {
      "Content-Type": "application/json",
      ...(localToken && { Authorization: `Bearer ${localToken}` }),
    },
  });

  const data = response.data;

  return data;
};

const toggleCompletedTodo = async (todoId) => {
  const localToken = localStorage.getItem("token");

  const response = await axios({
    method: "PATCH",
    url: `${import.meta.env.VITE_API_URL}/todos/${todoId}/toggleCompleted`,
    headers: {
      "Content-Type": "application/json",
      ...(localToken && { Authorization: `Bearer ${localToken}` }),
    },
  });

  const data = response.data;

  return data;
};

export { fetchTodos, createTodo, deleteTodo, updateTodo, toggleCompletedTodo };

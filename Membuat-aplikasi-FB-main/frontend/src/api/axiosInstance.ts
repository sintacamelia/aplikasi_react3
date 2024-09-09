import axios from "axios";
import { BACKEND_BASE_URL } from "../constants";

// Create an Axios instance with default options
const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});
const saveTodo = async (todo: { title: string; description: string }) => {
  try {
    const response = await fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    console.log('Todo saved:', data);
  } catch (error) {
    console.error('Error saving todo:', error);
  }
};


export default axiosInstance;


import axios from 'axios';

// Create Axios instance with baseURL
export const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add request interceptor to include Authorization token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// API Endpoints
export const signup = (formData) => API.post('/users/signup', formData);
export const login = (formData) => API.post('/users/login', formData);
export const createTask = (taskData) => API.post('/tasks', taskData);
export const getTasks = (filters) => API.get('/tasks', { params: filters });
export const updateTask = (id, updates) => API.patch(`/tasks/${id}`, updates);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
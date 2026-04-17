import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function fetchUsers() {
  const response = await api.get('/users');
  return response.data;
}

export async function createUser(usuario) {
  const response = await api.post('/users', usuario);
  return response.data;
}

export async function loginUser(credentials) {
  const response = await api.post('/users/login', credentials);
  return response.data;
}

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function fetchProducts() {
  const response = await api.get('/products');
  return response.data;
}

export async function createCart(usuarioId = 1) {
  const response = await api.post('/sales/cart', null, { params: { usuarioId } });
  return response.data;
}

export async function addProductToCart(cartId, productoId, cantidad) {
  const response = await api.post(`/sales/cart/${cartId}/items`, { productoId, cantidad });
  return response.data;
}

export async function fetchCart(cartId) {
  const response = await api.get(`/sales/cart/${cartId}`);
  return response.data;
}

export async function checkoutCart(cartId) {
  const response = await api.post(`/sales/invoice/${cartId}`);
  return response.data;
}

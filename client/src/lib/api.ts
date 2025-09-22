import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Simple helpers matching your backend endpoints
export const authApi = {
  // user
  userRegister: (payload) => api.post('/api/auth/user/register', payload),
  userLogin: (payload) => api.post('/api/auth/user/login', payload),
  userLogout: () => api.get('/api/auth/user/logout'),

  // partner
  partnerRegister: (payload) =>
    api.post('/api/auth/food-partner/register', payload),
  partnerLogin: (payload) => api.post('/api/auth/food-partner/login', payload),
  partnerLogout: () => api.get('/api/auth/food-partner/logout'),

  // me
  me: () => api.get('/api/auth/me'),
};

// data routes (protected ones)
export const foodApi = {
  createFoodItem: (formData) =>
    api.post('/api/food', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getFoodItems: () => api.get('/api/food'),
  likeFood: (payload) => api.post('/api/food/like', payload),
  saveFood: (payload) => api.post('/api/food/save', payload),
};

export default api;

import axios from 'axios';
import { getAuthHeader } from './auth';

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;
console.log("API URL",API_URL);

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const headers = getAuthHeader();
    if (headers) {
      config.headers = { ...config.headers, ...headers };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
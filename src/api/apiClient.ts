import axios from 'axios';
import { API_BASE_URL } from './config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.defaults.headers.post['Content-Type'] = 'application/json';
apiClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('userData') || '{}')?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

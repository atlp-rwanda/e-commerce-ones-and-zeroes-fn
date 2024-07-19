
import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    
    const token = localStorage.getItem('token');
    
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    
    return request;
  },
  (error) => Promise.reject(error)
);

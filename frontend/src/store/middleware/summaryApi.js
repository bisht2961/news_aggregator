import axios from 'axios';
import config from './config';

const summaryApi = axios.create({
  baseURL: config.SUMMARY_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// We might still need auth for summary API
summaryApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default summaryApi;
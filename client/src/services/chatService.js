import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}`
  : '/api/chat';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export const sendMessage = async (message, sessionId, pageVisited = window.location.href) => {
  const response = await api.post('/message', { message, sessionId, pageVisited });
  return response.data;
};

export const getHistory = async (sessionId) => {
  const response = await api.get(`/history/${sessionId}`);
  return response.data;
};

export const submitLead = async (leadData) => {
  const response = await api.post('/lead', leadData);
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;

import axios from 'axios';

// Base URL — uses Vite proxy in dev, actual URL in production
const BASE_URL = import.meta.env.VITE_API_URL || '/api/chat';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Send a message to the backend
 * @param {string} message - User's message
 * @param {string} sessionId - Unique session identifier
 * @param {string} pageVisited - Current page URL
 * @returns {Promise<{reply: string, sessionId: string}>}
 */
export const sendMessage = async (message, sessionId, pageVisited = window.location.href) => {
  const response = await api.post('/message', { message, sessionId, pageVisited });
  return response.data;
};

/**
 * Get conversation history for a session
 * @param {string} sessionId
 * @returns {Promise<{messages: Array}>}
 */
export const getHistory = async (sessionId) => {
  const response = await api.get(`/history/${sessionId}`);
  return response.data;
};

/**
 * Submit a lead from the chatbot contact form
 * @param {Object} leadData - {name, email, message, intent, sessionId}
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const submitLead = async (leadData) => {
  const response = await api.post('/lead', leadData);
  return response.data;
};

/**
 * Check API health
 */
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;

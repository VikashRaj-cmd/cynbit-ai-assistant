import express from 'express';
import { sendMessage, getHistory, submitLead, healthCheck } from '../controllers/chatController.js';
import { chatRateLimiter, leadRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Health check
router.get('/health', healthCheck);

// Chat endpoints
router.post('/message', chatRateLimiter, sendMessage);
router.get('/history/:sessionId', getHistory);

// Lead capture
router.post('/lead', leadRateLimiter, submitLead);

export default router;

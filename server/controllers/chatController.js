import Conversation from '../models/Conversation.js';
import Lead from '../models/Lead.js';
import { generateAIResponse, getFallbackResponse } from '../services/aiService.js';
import { getDBStatus } from '../config/db.js';

// In-memory store fallback when MongoDB is not connected
const memoryConversations = new Map();
const memoryLeads = [];

/**
 * POST /api/chat/message
 * Main chat endpoint — saves messages, calls AI with fallback, returns response
 */
export const sendMessage = async (req, res) => {
  try {
    const { message, sessionId, pageVisited } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message is required.' });
    }

    if (!sessionId) {
      return res.status(400).json({ success: false, error: 'Session ID is required.' });
    }

    let conversation;
    const dbActive = getDBStatus();

    if (dbActive) {
      conversation = await Conversation.findOne({ sessionId });
      if (!conversation) {
        conversation = new Conversation({
          sessionId,
          messages: [],
          metadata: {
            userAgent: req.headers['user-agent'],
            ip: req.ip,
            pageVisited: pageVisited || 'unknown',
          },
        });
      }
    } else {
      if (!memoryConversations.has(sessionId)) {
        memoryConversations.set(sessionId, {
          sessionId,
          messages: [],
          metadata: {
            userAgent: req.headers['user-agent'],
            ip: req.ip,
            pageVisited: pageVisited || 'unknown',
          },
        });
      }
      conversation = memoryConversations.get(sessionId);
    }

    // Add user message
    conversation.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date(),
    });

    // Get recent message history (last 10 messages for context)
    const recentMessages = conversation.messages.slice(-10);

    let assistantReply;
    try {
      // Try AI response first (Gemini Free Tier or OpenAI)
      assistantReply = await generateAIResponse(recentMessages);
    } catch (aiError) {
      // Fall back to keyword-based response if AI is unavailable or quota exceeded
      console.warn(`AI fallback triggered (${aiError.message}).`);
      assistantReply = getFallbackResponse(message);
    }

    // Add assistant reply to conversation
    conversation.messages.push({
      role: 'assistant',
      content: assistantReply,
      timestamp: new Date(),
    });

    if (dbActive) {
      await conversation.save();
    }

    return res.status(200).json({
      success: true,
      reply: assistantReply,
      sessionId,
      messageCount: conversation.messages.length,
    });
  } catch (error) {
    console.error('Chat Controller Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again.',
    });
  }
};

/**
 * GET /api/chat/history/:sessionId
 * Retrieve conversation history for a session
 */
export const getHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const dbActive = getDBStatus();

    let messages = [];
    if (dbActive) {
      const conversation = await Conversation.findOne({ sessionId });
      if (conversation) {
        messages = conversation.messages;
      }
    } else {
      const conversation = memoryConversations.get(sessionId);
      if (conversation) {
        messages = conversation.messages;
      }
    }

    return res.status(200).json({
      success: true,
      messages,
      messageCount: messages.length,
    });
  } catch (error) {
    console.error('History Controller Error:', error);
    return res.status(500).json({ success: false, error: 'Could not retrieve history.' });
  }
};

/**
 * POST /api/chat/lead
 * Capture a lead from the chatbot
 */
export const submitLead = async (req, res) => {
  try {
    const { name, email, message, intent, sessionId } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address.' });
    }

    const dbActive = getDBStatus();
    if (dbActive) {
      const lead = new Lead({ name, email, message, intent, sessionId });
      await lead.save();
    } else {
      memoryLeads.push({
        name,
        email,
        message,
        intent: intent || 'general',
        sessionId,
        createdAt: new Date(),
      });
      console.log(`📝 [In-Memory Lead Captured]: ${name} (${email}) - ${intent}`);
    }

    return res.status(201).json({
      success: true,
      message: 'Your message has been received! The Cynbit team will contact you within 24 hours.',
    });
  } catch (error) {
    console.error('Lead Controller Error:', error);
    return res.status(500).json({ success: false, error: 'Could not submit. Please try again.' });
  }
};

/**
 * GET /api/chat/health
 * Health check endpoint
 */
export const healthCheck = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Cynbit AI Assistant API is running.',
    database: getDBStatus() ? 'MongoDB Atlas (Connected)' : 'In-Memory Resilient Cache',
    timestamp: new Date().toISOString(),
  });
};

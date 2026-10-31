import Conversation from '../models/Conversation.js';
import Lead from '../models/Lead.js';
import { generateAIResponse, getFallbackResponse } from '../services/aiService.js';

/**
 * POST /api/chat
 * Main chat endpoint — saves messages to MongoDB, calls AI, returns response
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

    // Find or create conversation for this session
    let conversation = await Conversation.findOne({ sessionId });

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

    // Add user message
    conversation.messages.push({ role: 'user', content: message });

    // Get recent message history (last 10 messages for context)
    const recentMessages = conversation.messages.slice(-10);

    let assistantReply;
    try {
      // Try AI response first
      assistantReply = await generateAIResponse(recentMessages);
    } catch (aiError) {
      // Fall back to keyword-based response if AI is unavailable
      console.warn(`AI unavailable (${aiError.message}), using fallback.`);
      assistantReply = getFallbackResponse(message);
    }

    // Add assistant reply to conversation
    conversation.messages.push({ role: 'assistant', content: assistantReply });
    await conversation.save();

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
    const conversation = await Conversation.findOne({ sessionId });

    if (!conversation) {
      return res.status(200).json({ success: true, messages: [] });
    }

    return res.status(200).json({
      success: true,
      messages: conversation.messages,
      messageCount: conversation.messages.length,
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

    const lead = new Lead({ name, email, message, intent, sessionId });
    await lead.save();

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
    timestamp: new Date().toISOString(),
  });
};

import { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, MessageSquare } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import QuickActions from './QuickActions';
import ChatInput from './ChatInput';
import { sendMessage } from '../services/chatService';

// Generate or retrieve a persistent session ID
const getSessionId = () => {
  const key = 'cynbit_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
};

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: `👋 Hi there! I'm **Cynbit's AI Assistant**.

I can help you with:
- 🛠️ Services & expertise
- 📦 Products (Studio, TenantEase, Revio)
- 💼 Careers & internships
- 🎓 BitElevate program
- 📞 Contact & pricing

What would you like to know?`,
  timestamp: new Date().toISOString(),
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionId = useRef(getSessionId());

  // Show notification bubble after 5 seconds if chat is closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setHasNotification(true), 5000);
      return () => clearTimeout(timer);
    }
    setHasNotification(false);
  }, [isOpen]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasNotification(false);
  };

  const handleClose = () => setIsOpen(false);

  const handleToggleMinimize = () => setIsMinimized((prev) => !prev);

  const handleSend = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    // Optimistic UI — add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Add typing indicator
    const typingId = `typing_${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: typingId, role: 'assistant', content: '', isTyping: true },
    ]);

    try {
      const data = await sendMessage(text, sessionId.current);

      // Replace typing indicator with actual response
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== typingId)
          .concat({
            id: `ai_${Date.now()}`,
            role: 'assistant',
            content: data.reply,
            timestamp: new Date().toISOString(),
          })
      );
    } catch (err) {
      // Remove typing indicator and show error
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== typingId)
          .concat({
            id: `err_${Date.now()}`,
            role: 'assistant',
            content:
              '⚠️ I\'m having trouble connecting right now. Please try again or reach out directly at **opportunities@cynbit.in** or call **+91 89479 62667**.',
            timestamp: new Date().toISOString(),
          })
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          id="cynbit-chat-btn"
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 glow-blue animate-float"
          style={{ background: 'linear-gradient(135deg, #2563eb 0%, #0e7490 100%)' }}
          aria-label="Open Cynbit AI Assistant"
        >
          <MessageSquare size={24} className="text-white" />

          {/* Notification badge */}
          {hasNotification && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold animate-bounce">
              1
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="cynbit-chat-window"
          className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden transition-all duration-300"
          style={{
            width: '360px',
            height: isMinimized ? 'auto' : '560px',
            background: '#0f172a',
            border: '1px solid rgba(99,102,241,0.2)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
          }}
        >
          <ChatHeader
            isMinimized={isMinimized}
            onToggleMinimize={handleToggleMinimize}
            onClose={handleClose}
          />

          {!isMinimized && (
            <>
              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll"
                style={{ background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)' }}
              >
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div style={{ background: '#0f172a' }}>
                <QuickActions onSelect={handleSend} disabled={isLoading} />
                <ChatInput onSend={handleSend} isLoading={isLoading} />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;

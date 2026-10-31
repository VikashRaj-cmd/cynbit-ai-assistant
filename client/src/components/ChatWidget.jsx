import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, UserRound } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import QuickActions from './QuickActions';
import ChatInput from './ChatInput';
import LeadForm from './LeadForm';
import { sendMessage } from '../services/chatService';

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
  content: `👋 Hi there! I'm **Cynbit's AI Assistant**.\n\nI can help you with:\n- 🛠️ Services & expertise\n- 📦 Products (Studio, TenantEase, Revio)\n- 💼 Careers & internships\n- 🎓 BitElevate program\n- 📞 Contact & pricing\n\nWhat would you like to know?`,
  timestamp: new Date().toISOString(),
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionId = useRef(getSessionId());

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setHasNotification(true), 5000);
      return () => clearTimeout(timer);
    }
    setHasNotification(false);
  }, [isOpen]);

  useEffect(() => {
    if (!showLeadForm) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showLeadForm]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasNotification(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowLeadForm(false);
  };

  const handleToggleMinimize = () => setIsMinimized((prev) => !prev);

  const handleSend = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    setShowLeadForm(false);

    const userMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const typingId = `typing_${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: typingId, role: 'assistant', content: '', isTyping: true },
    ]);

    try {
      const data = await sendMessage(text, sessionId.current);
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
    } catch {
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== typingId)
          .concat({
            id: `err_${Date.now()}`,
            role: 'assistant',
            content:
              "⚠️ I'm having trouble connecting right now. Please try again or reach out at **opportunities@cynbit.in** or call **+91 89479 62667**.",
            timestamp: new Date().toISOString(),
          })
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleLeadSuccess = () => {
    setShowLeadForm(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `lead_confirm_${Date.now()}`,
        role: 'assistant',
        content:
          '✅ Your message has been received! A Cynbit team member will reach out within **24 hours**.\n\nIs there anything else I can help you with?',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          id="cynbit-chat-btn"
          onClick={handleOpen}
          aria-label="Open Cynbit AI Assistant"
          className="animate-float glow-blue"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 9999,
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #2563eb 0%, #0e7490 100%)',
            boxShadow: '0 8px 32px rgba(37,99,235,0.45)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,99,235,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,99,235,0.45)';
          }}
        >
          <MessageSquare size={22} color="white" />
          {hasNotification && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#ef4444',
                border: '2px solid #0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: 'white',
                fontWeight: 700,
              }}
            >
              1
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="cynbit-chat-window"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 9999,
            width: '380px',
            height: isMinimized ? 'auto' : '600px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            background: '#0d1526',
            border: '1px solid rgba(99,102,241,0.25)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
            transition: 'height 0.3s ease',
          }}
        >
          <ChatHeader
            isMinimized={isMinimized}
            onToggleMinimize={handleToggleMinimize}
            onClose={handleClose}
          />

          {!isMinimized && (
            <>
              {showLeadForm ? (
                /* Lead capture form view */
                <div
                  className="chat-scroll"
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    background: 'linear-gradient(180deg, #0d1526 0%, #0f1a2e 100%)',
                  }}
                >
                  <LeadForm
                    sessionId={sessionId.current}
                    onClose={() => setShowLeadForm(false)}
                    onSuccess={handleLeadSuccess}
                  />
                </div>
              ) : (
                /* Chat view */
                <div
                  className="chat-scroll"
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1.25rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    background: 'linear-gradient(180deg, #0d1526 0%, #0f1a2e 100%)',
                  }}
                >
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* Bottom panel — always visible */}
              <div
                style={{
                  background: '#0d1526',
                  borderTop: '1px solid rgba(99,102,241,0.15)',
                  flexShrink: 0,
                }}
              >
                {/* Talk to a human button */}
                {!showLeadForm && (
                  <div
                    style={{
                      padding: '0.5rem 0.875rem 0',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <button
                      onClick={() => setShowLeadForm(true)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(52,211,153,0.3)',
                        background: 'rgba(52,211,153,0.08)',
                        color: '#6ee7b7',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(52,211,153,0.18)';
                        e.currentTarget.style.borderColor = 'rgba(52,211,153,0.55)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(52,211,153,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(52,211,153,0.3)';
                      }}
                    >
                      <UserRound size={11} />
                      Talk to a human
                    </button>
                  </div>
                )}

                <QuickActions onSelect={handleSend} disabled={isLoading || showLeadForm} />
                <ChatInput onSend={handleSend} isLoading={isLoading || showLeadForm} />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;

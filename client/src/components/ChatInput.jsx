import { useState, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ onSend, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 96) + 'px';
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '0.5rem',
        padding: '0.75rem 0.875rem',
      }}
    >
      <textarea
        ref={textareaRef}
        id="chat-input"
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Cynbit's services, products…"
        disabled={isLoading}
        rows={1}
        aria-label="Chat message input"
        style={{
          flex: 1,
          resize: 'none',
          borderRadius: '0.875rem',
          padding: '0.625rem 0.875rem',
          fontSize: '0.8125rem',
          lineHeight: 1.5,
          outline: 'none',
          background: 'rgba(15,28,52,0.9)',
          border: '1px solid rgba(99,102,241,0.25)',
          color: '#f1f5f9',
          maxHeight: '96px',
          fontFamily: 'Inter, sans-serif',
          transition: 'border-color 0.2s',
          opacity: isLoading ? 0.6 : 1,
        }}
        onFocus={(e) => (e.target.style.borderColor = 'rgba(99,102,241,0.6)')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(99,102,241,0.25)')}
      />
      <button
        id="chat-send-btn"
        type="submit"
        disabled={!inputValue.trim() || isLoading}
        aria-label="Send message"
        style={{
          width: '2.375rem',
          height: '2.375rem',
          borderRadius: '0.75rem',
          border: 'none',
          cursor: !inputValue.trim() || isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: 'linear-gradient(135deg, #2563eb, #0e7490)',
          opacity: !inputValue.trim() || isLoading ? 0.4 : 1,
          transition: 'opacity 0.2s, transform 0.15s',
          boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
        }}
        onMouseEnter={(e) => {
          if (inputValue.trim() && !isLoading) {
            e.currentTarget.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isLoading ? (
          <Loader2 size={15} color="white" style={{ animation: 'spin 1s linear infinite' }} />
        ) : (
          <Send size={15} color="white" />
        )}
      </button>
    </form>
  );
};

export default ChatInput;

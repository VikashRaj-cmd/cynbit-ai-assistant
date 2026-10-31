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
    // Auto-resize textarea
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 100) + 'px';
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 px-3 py-3 border-t"
      style={{ borderColor: 'rgba(99,102,241,0.12)' }}
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
        className="flex-1 resize-none rounded-xl px-3 py-2.5 text-sm outline-none transition-all disabled:opacity-60"
        style={{
          background: 'rgba(30,41,59,0.8)',
          border: '1px solid rgba(99,102,241,0.2)',
          color: '#f1f5f9',
          maxHeight: '100px',
          lineHeight: '1.5',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'rgba(99,102,241,0.5)')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(99,102,241,0.2)')}
        aria-label="Chat message input"
      />
      <button
        id="chat-send-btn"
        type="submit"
        disabled={!inputValue.trim() || isLoading}
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #2563eb, #0e7490)' }}
        aria-label="Send message"
      >
        {isLoading ? (
          <Loader2 size={16} className="text-white animate-spin" />
        ) : (
          <Send size={16} className="text-white" />
        )}
      </button>
    </form>
  );
};

export default ChatInput;

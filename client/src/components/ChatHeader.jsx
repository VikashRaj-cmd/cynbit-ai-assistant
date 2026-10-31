import { Bot, X, Minimize2, Maximize2, Sparkles } from 'lucide-react';

const ChatHeader = ({ isMinimized, onToggleMinimize, onClose }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.875rem 1rem',
        background: 'linear-gradient(135deg, #1a3a7a 0%, #1e40af 50%, #0c6e8a 100%)',
        borderBottom: '1px solid rgba(99,102,241,0.2)',
        flexShrink: 0,
      }}
    >
      {/* Left — Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Avatar with online dot */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <Bot size={18} color="white" />
          </div>
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              background: '#34d399',
              border: '2px solid #1e40af',
            }}
          />
        </div>

        {/* Name + status */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span
              style={{
                color: 'white',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '-0.01em',
              }}
            >
              Cynbit Assistant
            </span>
            <Sparkles size={12} color="#67e8f9" />
          </div>
          <div
            style={{
              color: '#bfdbfe',
              fontSize: '0.7rem',
              fontWeight: 500,
              marginTop: '1px',
            }}
          >
            AI-powered · Always available
          </div>
        </div>
      </div>

      {/* Right — Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <button
          onClick={onToggleMinimize}
          title={isMinimized ? 'Expand' : 'Minimize'}
          aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
          style={{
            width: '1.875rem',
            height: '1.875rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            color: '#bfdbfe',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#bfdbfe';
          }}
        >
          {isMinimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
        </button>
        <button
          onClick={onClose}
          title="Close chat"
          aria-label="Close chat"
          style={{
            width: '1.875rem',
            height: '1.875rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            color: '#bfdbfe',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239,68,68,0.3)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#bfdbfe';
          }}
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

import { Bot, User, ExternalLink } from 'lucide-react';

const parseLinks = (text) => {
  const parts = [];
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let lastIndex = 0;
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'link', text: match[1], url: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }
  return parts;
};

const formatText = (text) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: '#67e8f9', fontWeight: 700 }}>
        {part}
      </strong>
    ) : (
      part
    )
  );

const renderContent = (content) => {
  const lines = content.split('\n');
  const elements = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} style={{ margin: '0.375rem 0', padding: 0, listStyle: 'none' }}>
          {listBuffer}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((line, idx) => {
    if (line.trim() === '') {
      flushList();
      return;
    }

    const isListItem = /^[-*]\s/.test(line);
    const parsed = parseLinks(line);

    const lineContent = parsed.map((part, pIdx) => {
      if (part.type === 'link') {
        return (
          <a
            key={pIdx}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              color: '#38bdf8',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#7dd3fc')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#38bdf8')}
          >
            {part.text}
            <ExternalLink size={10} />
          </a>
        );
      }
      return <span key={pIdx}>{formatText(part.content)}</span>;
    });

    if (isListItem) {
      const itemText = line.replace(/^[-*]\s/, '');
      const itemParsed = parseLinks(itemText);
      const itemContent = itemParsed.map((part, pIdx) => {
        if (part.type === 'link') {
          return (
            <a
              key={pIdx}
              href={part.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                color: '#38bdf8',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}
            >
              {part.text}
              <ExternalLink size={10} />
            </a>
          );
        }
        return <span key={pIdx}>{formatText(part.content)}</span>;
      });

      listBuffer.push(
        <li
          key={idx}
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'flex-start',
            padding: '0.2rem 0',
            fontSize: '0.8125rem',
            lineHeight: 1.55,
          }}
        >
          <span style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }}>•</span>
          <span>{itemContent}</span>
        </li>
      );
    } else {
      flushList();
      elements.push(
        <p
          key={idx}
          style={{
            margin: idx === 0 ? 0 : '0.25rem 0 0',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
          }}
        >
          {lineContent}
        </p>
      );
    }
  });

  flushList();
  return elements;
};

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  const isTyping = message.isTyping;

  return (
    <div
      className="animate-slide-up"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '0.5rem',
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '1.875rem',
          height: '1.875rem',
          borderRadius: '50%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isUser
            ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
            : 'linear-gradient(135deg, #1d4ed8, #0e7490)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {isUser ? <User size={13} color="white" /> : <Bot size={13} color="white" />}
      </div>

      {/* Bubble */}
      <div
        style={{
          maxWidth: '78%',
          borderRadius: isUser ? '1.125rem 1.125rem 0.25rem 1.125rem' : '1.125rem 1.125rem 1.125rem 0.25rem',
          padding: isTyping ? '0.75rem 1rem' : '0.75rem 1rem 0.5rem',
          background: isUser
            ? 'linear-gradient(135deg, #2563eb, #0e7490)'
            : 'rgba(22,36,60,0.95)',
          border: isUser ? 'none' : '1px solid rgba(99,102,241,0.22)',
          color: isUser ? 'white' : '#e2e8f0',
          boxShadow: isUser
            ? '0 4px 16px rgba(37,99,235,0.25)'
            : '0 2px 12px rgba(0,0,0,0.25)',
        }}
      >
        {isTyping ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span className="typing-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
            <span className="typing-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
            <span className="typing-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
              {renderContent(message.content)}
            </div>
            <div
              style={{
                fontSize: '0.625rem',
                marginTop: '0.375rem',
                color: isUser ? 'rgba(255,255,255,0.55)' : '#475569',
                textAlign: isUser ? 'right' : 'left',
              }}
            >
              {new Date(message.timestamp || Date.now()).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;

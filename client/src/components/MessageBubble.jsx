import { Bot, User, ExternalLink } from 'lucide-react';

// Parse markdown-like links: [text](url) → clickable anchor
const parseLinks = (text) => {
  const parts = [];
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
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

// Format bold text: **text** → <strong>
const formatText = (text) => {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-cyan-300">
        {part}
      </strong>
    ) : (
      part
    )
  );
};

const renderContent = (content) => {
  const lines = content.split('\n');
  return lines.map((line, lineIdx) => {
    const isListItem = line.match(/^[\-\*\d+\.]\s/);
    const parsed = parseLinks(line);

    const lineContent = parsed.map((part, partIdx) => {
      if (part.type === 'link') {
        return (
          <a
            key={partIdx}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
          >
            {part.text}
            <ExternalLink size={11} />
          </a>
        );
      }
      return <span key={partIdx}>{formatText(part.content)}</span>;
    });

    if (isListItem) {
      return (
        <li key={lineIdx} className="ml-4 list-none flex gap-2">
          <span className="text-cyan-400 mt-0.5">•</span>
          <span>{lineContent}</span>
        </li>
      );
    }

    return (
      <p key={lineIdx} className={lineIdx > 0 && lines[lineIdx - 1] !== '' ? '' : ''}>
        {lineContent}
      </p>
    );
  });
};

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  const isTyping = message.isTyping;

  return (
    <div
      className={`flex items-end gap-2 animate-slide-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
          isUser
            ? 'bg-blue-600'
            : 'bg-gradient-to-br from-blue-600 to-cyan-500'
        }`}
      >
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <Bot size={14} className="text-white" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm text-white'
            : 'rounded-bl-sm text-slate-100'
        }`}
        style={
          isUser
            ? { background: 'linear-gradient(135deg, #2563eb, #0e7490)' }
            : {
                background: 'rgba(30,41,59,0.95)',
                border: '1px solid rgba(99,102,241,0.2)',
              }
        }
      >
        {isTyping ? (
          <div className="flex items-center gap-1.5 py-1">
            <span className="typing-dot w-2 h-2 bg-cyan-400 rounded-full inline-block" />
            <span className="typing-dot w-2 h-2 bg-cyan-400 rounded-full inline-block" />
            <span className="typing-dot w-2 h-2 bg-cyan-400 rounded-full inline-block" />
          </div>
        ) : (
          <div className="space-y-1">{renderContent(message.content)}</div>
        )}

        {/* Timestamp */}
        {!isTyping && (
          <div
            className={`text-[10px] mt-1.5 ${
              isUser ? 'text-blue-200' : 'text-slate-500'
            }`}
          >
            {new Date(message.timestamp || Date.now()).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;

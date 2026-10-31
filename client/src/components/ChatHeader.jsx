import { Bot, X, Minimize2, Maximize2, Sparkles } from 'lucide-react';

const ChatHeader = ({ isMinimized, onToggleMinimize, onClose }) => {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-t-2xl"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0e7490 100%)',
        borderBottom: '1px solid rgba(99,102,241,0.2)',
      }}
    >
      {/* Left — Branding */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            <Bot size={18} className="text-white" />
          </div>
          {/* Online indicator */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-blue-900" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold text-sm tracking-tight">Cynbit Assistant</span>
            <Sparkles size={12} className="text-cyan-300" />
          </div>
          <div className="text-blue-200 text-[10px] font-medium">AI-powered · Always available</div>
        </div>
      </div>

      {/* Right — Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleMinimize}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/20 text-blue-200 hover:text-white"
          title={isMinimized ? 'Expand' : 'Minimize'}
          aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
        >
          {isMinimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
        </button>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/30 text-blue-200 hover:text-white"
          title="Close chat"
          aria-label="Close chat"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

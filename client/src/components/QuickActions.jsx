const QUICK_ACTIONS = [
  { label: '🛠️ Services', query: 'What services does Cynbit offer?' },
  { label: '📦 Products', query: 'Tell me about Cynbit products' },
  { label: '💼 Careers', query: 'How can I apply for a job or internship at Cynbit?' },
  { label: '📞 Contact', query: 'How can I contact Cynbit Technologies?' },
  { label: '🎓 BitElevate', query: 'What is the BitElevate program?' },
  { label: '💰 Pricing', query: 'How much does Cynbit charge for their services?' },
];

const QuickActions = ({ onSelect, disabled }) => {
  return (
    <div className="px-3 py-2 border-t" style={{ borderColor: 'rgba(99,102,241,0.1)' }}>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2">
        Quick Questions
      </p>
      <div className="flex flex-wrap gap-1.5">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => onSelect(action.query)}
            disabled={disabled}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 active:scale-95"
            style={{
              background: 'rgba(37,99,235,0.1)',
              border: '1px solid rgba(37,99,235,0.25)',
              color: '#93c5fd',
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.target.style.background = 'rgba(37,99,235,0.25)';
                e.target.style.borderColor = 'rgba(37,99,235,0.5)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(37,99,235,0.1)';
              e.target.style.borderColor = 'rgba(37,99,235,0.25)';
            }}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

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
    <div
      style={{
        padding: '0.625rem 0.875rem 0.5rem',
        borderBottom: '1px solid rgba(99,102,241,0.12)',
      }}
    >
      <p
        style={{
          fontSize: '0.6rem',
          color: '#475569',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 600,
          marginBottom: '0.5rem',
        }}
      >
        Quick Questions
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => onSelect(action.query)}
            disabled={disabled}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontWeight: 500,
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.4 : 1,
              background: 'rgba(37,99,235,0.1)',
              border: '1px solid rgba(37,99,235,0.28)',
              color: '#93c5fd',
              transition: 'background 0.15s, border-color 0.15s, transform 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.background = 'rgba(37,99,235,0.22)';
                e.currentTarget.style.borderColor = 'rgba(37,99,235,0.55)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(37,99,235,0.1)';
              e.currentTarget.style.borderColor = 'rgba(37,99,235,0.28)';
              e.currentTarget.style.transform = 'translateY(0)';
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

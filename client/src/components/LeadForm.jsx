import { useState, useEffect } from 'react';
import { User, Mail, MessageSquare, Send, Loader2, CheckCircle, X, UserRound, ChevronDown } from 'lucide-react';
import { submitLead } from '../services/chatService';

const INTENTS = [
  { value: 'general', label: '💬 General Inquiry' },
  { value: 'project', label: '🚀 Start a Project' },
  { value: 'internship', label: '💼 Internship / Job' },
  { value: 'partnership', label: '🤝 Partnership' },
];

const LeadForm = ({ sessionId, onClose, onSuccess }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '', intent: 'general' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await submitLead({ ...form, sessionId });
      setSubmitted(true);
      setTimeout(() => { onSuccess?.(); }, 2800);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(5, 10, 24, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fade-in 0.2s ease-out',
      }}
    >
      {/* Modal card */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          borderRadius: '1.5rem',
          background: 'linear-gradient(160deg, #0f1e3a 0%, #0d1526 60%, #0a1020 100%)',
          border: '1px solid rgba(99,102,241,0.25)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.1)',
          overflow: 'hidden',
          animation: 'slide-up 0.25s ease-out',
        }}
      >
        {submitted ? (
          /* ── Success state ── */
          <div
            style={{
              padding: '3rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '5rem',
                height: '5rem',
                borderRadius: '50%',
                background: 'rgba(52,211,153,0.12)',
                border: '1px solid rgba(52,211,153,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <CheckCircle size={36} color="#34d399" />
            </div>
            <p style={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              Message Sent! 🎉
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '300px' }}>
              The Cynbit team will get back to you within{' '}
              <strong style={{ color: '#67e8f9' }}>24 hours</strong>.
            </p>
            <p style={{ color: '#475569', fontSize: '0.75rem' }}>Closing automatically…</p>
          </div>
        ) : (
          <>
            {/* ── Modal header ── */}
            <div
              style={{
                padding: '1.5rem 1.75rem 1.25rem',
                borderBottom: '1px solid rgba(99,102,241,0.12)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(14,116,144,0.06) 100%)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div
                  style={{
                    width: '2.75rem',
                    height: '2.75rem',
                    borderRadius: '0.875rem',
                    background: 'linear-gradient(135deg, rgba(37,99,235,0.25), rgba(14,116,144,0.25))',
                    border: '1px solid rgba(99,102,241,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <UserRound size={20} color="#93c5fd" />
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>
                    Talk to a Human
                  </p>
                  <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '2px' }}>
                    Cynbit team responds within 24 hours
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '0.625rem',
                  border: '1px solid rgba(99,102,241,0.15)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(15,28,52,0.8)',
                  color: '#64748b',
                  flexShrink: 0,
                  transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
                  e.currentTarget.style.color = '#f87171';
                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(15,28,52,0.8)';
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)';
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* ── Form body ── */}
            <form
              onSubmit={handleSubmit}
              style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {/* Name + Email row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={13} color="#475569" style={iconStyle} />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="off"
                      style={inputStyle}
                      onFocus={(e) => applyFocus(e)}
                      onBlur={(e) => removeFocus(e)}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={13} color="#475569" style={iconStyle} />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      autoComplete="off"
                      style={inputStyle}
                      onFocus={(e) => applyFocus(e)}
                      onBlur={(e) => removeFocus(e)}
                    />
                  </div>
                </div>
              </div>

              {/* Intent */}
              <div>
                <label style={labelStyle}>I'm interested in</label>
                <div style={{ position: 'relative' }}>
                  <select
                    name="intent"
                    value={form.intent}
                    onChange={handleChange}
                    style={{ ...inputStyle, paddingLeft: '0.875rem', cursor: 'pointer', appearance: 'none' }}
                    onFocus={(e) => applyFocus(e)}
                    onBlur={(e) => removeFocus(e)}
                  >
                    {INTENTS.map((i) => (
                      <option key={i.value} value={i.value} style={{ background: '#0d1526', color: '#f1f5f9' }}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    color="#475569"
                    style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message</label>
                <div style={{ position: 'relative' }}>
                  <MessageSquare size={13} color="#475569" style={{ ...iconStyle, top: '0.875rem', transform: 'none' }} />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how Cynbit can help you…"
                    rows={4}
                    style={{ ...inputStyle, resize: 'none', lineHeight: 1.6, paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
                    onFocus={(e) => applyFocus(e)}
                    onBlur={(e) => removeFocus(e)}
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  style={{
                    padding: '0.625rem 0.875rem',
                    borderRadius: '0.625rem',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    color: '#fca5a5',
                    fontSize: '0.775rem',
                  }}
                >
                  {error}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '0.875rem',
                    border: '1px solid rgba(99,102,241,0.2)',
                    background: 'transparent',
                    color: '#64748b',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.15s, color 0.15s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(99,102,241,0.08)';
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    borderRadius: '0.875rem',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: 'white',
                    background: loading
                      ? 'rgba(37,99,235,0.5)'
                      : 'linear-gradient(135deg, #2563eb, #0e7490)',
                    boxShadow: loading ? 'none' : '0 4px 20px rgba(37,99,235,0.35)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,99,235,0.45)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.35)';
                  }}
                >
                  {loading ? (
                    <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <Send size={15} />
                  )}
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  color: '#64748b',
  fontSize: '0.7rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: '0.375rem',
};

const iconStyle = {
  position: 'absolute',
  left: '0.875rem',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
};

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.875rem 0.65rem 2.375rem',
  borderRadius: '0.75rem',
  border: '1px solid rgba(99,102,241,0.2)',
  background: 'rgba(10,18,38,0.8)',
  color: '#f1f5f9',
  fontSize: '0.8375rem',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const applyFocus = (e) => {
  e.target.style.borderColor = 'rgba(99,102,241,0.55)';
  e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)';
};

const removeFocus = (e) => {
  e.target.style.borderColor = 'rgba(99,102,241,0.2)';
  e.target.style.boxShadow = 'none';
};

export default LeadForm;

import { useState } from 'react';
import { User, Mail, MessageSquare, Send, Loader2, CheckCircle, X } from 'lucide-react';
import { submitLead } from '../services/chatService';

const INTENTS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'project', label: 'Start a Project' },
  { value: 'internship', label: 'Internship / Job' },
  { value: 'partnership', label: 'Partnership' },
];

const LeadForm = ({ sessionId, onClose, onSuccess }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '', intent: 'general' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await submitLead({ ...form, sessionId });
      setSubmitted(true);
      setTimeout(() => onSuccess?.(), 2500);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          padding: '2rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            background: 'rgba(52,211,153,0.15)',
            border: '1px solid rgba(52,211,153,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckCircle size={28} color="#34d399" />
        </div>
        <p style={{ color: 'white', fontWeight: 700, fontSize: '0.9375rem' }}>Message Sent!</p>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.6 }}>
          The Cynbit team will get back to you within <strong style={{ color: '#67e8f9' }}>24 hours</strong>.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      {/* Form header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <div>
          <p style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>Talk to a Human</p>
          <p style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '2px' }}>
            We'll respond within 24 hours
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close form"
          style={{
            width: '1.75rem',
            height: '1.75rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(99,102,241,0.1)',
            color: '#94a3b8',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.1)')}
        >
          <X size={13} />
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {/* Name */}
        <div style={{ position: 'relative' }}>
          <User
            size={13}
            color="#475569"
            style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="off"
            style={inputStyle}
          />
        </div>

        {/* Email */}
        <div style={{ position: 'relative' }}>
          <Mail
            size={13}
            color="#475569"
            style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            autoComplete="off"
            style={inputStyle}
          />
        </div>

        {/* Intent */}
        <select
          name="intent"
          value={form.intent}
          onChange={handleChange}
          style={{
            ...inputStyle,
            paddingLeft: '0.75rem',
            cursor: 'pointer',
            appearance: 'none',
          }}
        >
          {INTENTS.map((i) => (
            <option key={i.value} value={i.value} style={{ background: '#0d1526' }}>
              {i.label}
            </option>
          ))}
        </select>

        {/* Message */}
        <div style={{ position: 'relative' }}>
          <MessageSquare
            size={13}
            color="#475569"
            style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', pointerEvents: 'none' }}
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="How can Cynbit help you?"
            rows={3}
            style={{
              ...inputStyle,
              resize: 'none',
              lineHeight: 1.5,
              paddingTop: '0.625rem',
              paddingBottom: '0.625rem',
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: '#f87171', fontSize: '0.7rem', margin: '0' }}>{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.625rem',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '0.8125rem',
            color: 'white',
            background: 'linear-gradient(135deg, #2563eb, #0e7490)',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s, transform 0.15s',
            boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {loading ? (
            <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <Send size={14} />
          )}
          {loading ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.575rem 0.75rem 0.575rem 2.25rem',
  borderRadius: '0.75rem',
  border: '1px solid rgba(99,102,241,0.22)',
  background: 'rgba(15,28,52,0.9)',
  color: '#f1f5f9',
  fontSize: '0.8rem',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

export default LeadForm;

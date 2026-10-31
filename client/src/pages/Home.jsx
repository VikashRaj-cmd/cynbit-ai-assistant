import {
  Bot,
  Zap,
  Globe,
  Code2,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  Shield,
  Cpu,
  Package,
} from 'lucide-react';

const services = [
  {
    icon: <Cpu size={20} />,
    title: 'AI Automation',
    description: 'Custom AI agents, LLM integrations, autonomous agents for cognitive business operations.',
    color: '#3b82f6',
    link: 'https://www.cynbit.in/services',
  },
  {
    icon: <Code2 size={20} />,
    title: 'Software Development',
    description: 'Full-stack web & mobile platforms, backend systems, cloud infrastructure (AWS/Azure).',
    color: '#06b6d4',
    link: 'https://www.cynbit.in/services',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Digital Marketing & SEO',
    description: 'Performance ads, technical SEO, CRM automation, and funnel optimization.',
    color: '#8b5cf6',
    link: 'https://www.cynbit.in/services',
  },
  {
    icon: <Shield size={20} />,
    title: 'Cloud Infrastructure',
    description: 'Zero-trust deployment, AWS/Azure architecture, security audits for global scale.',
    color: '#10b981',
    link: 'https://www.cynbit.in/services',
  },
];

const products = [
  {
    icon: '🚀',
    name: 'Cynbit Studio',
    tag: 'EdTech',
    description: 'AI-powered career growth lab with adaptive coding paths, mock interviews, and resume engine.',
    link: 'https://www.cynbit.in/products#cynbit-studio',
  },
  {
    icon: '🏢',
    name: 'TenantEase',
    tag: 'PropTech',
    description: 'Smart property & tenant management with automated rent tracking and digital profiles.',
    link: 'https://www.cynbit.in/products#tenantease',
  },
  {
    icon: '⭐',
    name: 'Revio',
    tag: 'Reputation AI',
    description: 'AI reputation management for multi-location businesses — automate customer feedback.',
    link: 'https://www.cynbit.in/products#revio',
  },
];

const Home = () => {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #0c1221 50%, #0f172a 100%)',
        color: '#f8fafc',
        fontFamily: 'Inter, sans-serif',
        overflowX: 'hidden',
      }}
    >
      {/* Ambient background glows */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: '-10rem',
            left: '-10rem',
            width: '24rem',
            height: '24rem',
            borderRadius: '50%',
            opacity: 0.12,
            filter: 'blur(80px)',
            background: 'radial-gradient(circle, #2563eb, transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '-10rem',
            width: '24rem',
            height: '24rem',
            borderRadius: '50%',
            opacity: 0.08,
            filter: 'blur(80px)',
            background: 'radial-gradient(circle, #0e7490, transparent)',
          }}
        />
      </div>

      {/* Header */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          borderBottom: '1px solid rgba(99,102,241,0.1)',
        }}
      >
        <div
          style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #2563eb, #0e7490)',
              }}
            >
              <Bot size={16} color="white" />
            </div>
            <span style={{ fontWeight: 700, color: 'white', letterSpacing: '-0.025em' }}>
              Cynbit AI Demo
            </span>
          </div>
          <a
            href="https://www.cynbit.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.875rem',
              color: '#94a3b8',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            <Globe size={14} />
            cynbit.in
            <ExternalLink size={12} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          padding: '6rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              marginBottom: '2rem',
              background: 'rgba(37,99,235,0.1)',
              border: '1px solid rgba(37,99,235,0.3)',
              color: '#93c5fd',
            }}
          >
            <Zap size={12} />
            Full Stack Developer Intern Assessment — Cynbit Technologies
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            <span className="gradient-text">Cynbit AI</span>
            <br />
            <span style={{ color: 'white' }}>Assistant</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#94a3b8',
              maxWidth: '42rem',
              margin: '0 auto 3rem',
              lineHeight: 1.7,
            }}
          >
            An AI-powered chatbot that helps visitors instantly understand Cynbit's services,
            products, and how to connect — improving engagement and reducing navigation friction.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => {
                const btn = document.getElementById('cynbit-chat-btn');
                if (btn) btn.click();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                borderRadius: '9999px',
                fontWeight: 700,
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #2563eb, #0e7490)',
                boxShadow: '0 10px 30px rgba(37,99,235,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(37,99,235,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,99,235,0.3)';
              }}
            >
              <MessageCircle size={18} />
              Try the Assistant
              <ArrowRight size={16} />
            </button>
            <a
              href="https://www.cynbit.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                borderRadius: '9999px',
                fontWeight: 700,
                color: '#94a3b8',
                textDecoration: 'none',
                border: '1px solid rgba(99,102,241,0.3)',
                fontSize: '1rem',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              <Globe size={18} />
              Visit Cynbit Website
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          padding: '0 1.5rem 5rem',
        }}
      >
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 900, color: 'white', marginBottom: '0.75rem' }}>
              Services Overview
            </h2>
            <p style={{ color: '#94a3b8' }}>Ask the assistant about any of these</p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            {services.map((service) => (
              <a
                key={service.title}
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(99,102,241,0.15)',
                  background: 'rgba(30,41,59,0.6)',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = `${service.color}50`;
                  e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    background: `${service.color}20`,
                    color: service.color,
                  }}
                >
                  {service.icon}
                </div>
                <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.75rem', lineHeight: 1.6 }}>
                  {service.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          padding: '0 1.5rem 5rem',
        }}
      >
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 900, color: 'white', marginBottom: '0.75rem' }}>
              Product Suite
            </h2>
            <p style={{ color: '#94a3b8' }}>Cynbit's proprietary SaaS ecosystem</p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {products.map((product) => (
              <a
                key={product.name}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(99,102,241,0.15)',
                  background: 'rgba(30,41,59,0.6)',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{product.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>{product.name}</div>
                    <div style={{ color: '#60a5fa', fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {product.tag}
                    </div>
                  </div>
                  <ExternalLink size={14} color="#475569" />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.75rem', lineHeight: 1.6 }}>
                  {product.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Note */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          padding: '0 1.5rem 6rem',
        }}
      >
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <div
            style={{
              borderRadius: '1.5rem',
              padding: '2.5rem',
              border: '1px solid rgba(37,99,235,0.2)',
              background: 'rgba(37,99,235,0.05)',
              textAlign: 'center',
            }}
          >
            <Package size={32} color="#60a5fa" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: 'white', fontWeight: 900, fontSize: '1.25rem', marginBottom: '0.75rem' }}>
              Assessment Project
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', maxWidth: '32rem', margin: '0 auto' }}>
              This prototype demonstrates an AI chatbot improvement for Cynbit's website. Built with{' '}
              <strong style={{ color: '#60a5fa' }}>React + Vite</strong>,{' '}
              <strong style={{ color: '#22d3ee' }}>Node.js + Express</strong>, and{' '}
              <strong style={{ color: '#c084fc' }}>MongoDB</strong> as part of the Full Stack Developer
              Intern technical assessment.
            </p>
            <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '1rem' }}>
              Click the chat bubble in the bottom-right corner to interact with the assistant →
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

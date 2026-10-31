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
      className="min-h-screen text-white font-sans"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0c1221 50%, #0f172a 100%)' }}
    >
      {/* Ambient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }}
        />
        <div
          className="absolute top-1/2 -right-40 w-96 h-96 rounded-full opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, #0e7490, transparent)' }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b" style={{ borderColor: 'rgba(99,102,241,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2563eb, #0e7490)' }}
            >
              <Bot size={16} className="text-white" />
            </div>
            <span className="font-bold text-white tracking-tight">Cynbit AI Demo</span>
          </div>
          <a
            href="https://www.cynbit.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <Globe size={14} />
            cynbit.in
            <ExternalLink size={12} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border"
          style={{
            background: 'rgba(37,99,235,0.1)',
            borderColor: 'rgba(37,99,235,0.3)',
            color: '#93c5fd',
          }}
        >
          <Zap size={12} />
          Full Stack Developer Intern Assessment — Cynbit Technologies
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
          <span className="gradient-text">Cynbit AI</span>
          <br />
          <span className="text-white">Assistant</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          An AI-powered chatbot that helps visitors instantly understand Cynbit's services, products, and
          how to connect — improving engagement and reducing navigation friction.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              const btn = document.getElementById('cynbit-chat-btn');
              if (btn) btn.click();
            }}
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #2563eb, #0e7490)' }}
          >
            <MessageCircle size={18} />
            Try the Assistant
            <ArrowRight size={16} />
          </button>
          <a
            href="https://www.cynbit.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:bg-white/10 border"
            style={{ borderColor: 'rgba(99,102,241,0.3)', color: '#94a3b8' }}
          >
            <Globe size={18} />
            Visit Cynbit Website
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3">Services Overview</h2>
          <p className="text-slate-400">Ask the assistant about any of these</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <a
              key={service.title}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: 'rgba(30,41,59,0.6)',
                borderColor: 'rgba(99,102,241,0.15)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = `${service.color}40`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)')
              }
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${service.color}20`, color: service.color }}
              >
                {service.icon}
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{service.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{service.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3">Product Suite</h2>
          <p className="text-slate-400">Cynbit's proprietary SaaS ecosystem</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: 'rgba(30,41,59,0.6)',
                borderColor: 'rgba(99,102,241,0.15)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{product.icon}</span>
                <div>
                  <div className="text-white font-bold text-sm">{product.name}</div>
                  <div
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: '#60a5fa' }}
                  >
                    {product.tag}
                  </div>
                </div>
                <ExternalLink
                  size={14}
                  className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors"
                />
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">{product.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Assessment Note */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div
          className="rounded-3xl p-8 border text-center"
          style={{
            background: 'rgba(37,99,235,0.05)',
            borderColor: 'rgba(37,99,235,0.2)',
          }}
        >
          <Package size={32} className="text-blue-400 mx-auto mb-4" />
          <h3 className="text-white font-black text-xl mb-2">Assessment Project</h3>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            This prototype demonstrates an AI chatbot improvement for Cynbit's website. Built with{' '}
            <strong className="text-blue-400">React + Vite</strong>,{' '}
            <strong className="text-cyan-400">Node.js + Express</strong>, and{' '}
            <strong className="text-purple-400">MongoDB</strong> as part of the Full Stack Developer
            Intern technical assessment.
          </p>
          <p className="text-slate-600 text-xs mt-4">
            Click the chat bubble in the bottom-right to interact with the assistant →
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

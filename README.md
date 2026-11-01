# Cynbit AI Assistant

> **Full Stack Developer Intern — Technical Assessment**
> Submitted by: **Vikash Rajput** | Parul University | Vadodara, Gujarat
> Assessment Reference: `cmux11mqw000004l58s3vqj6g`

---

## 🔗 Live Links

| | URL |
|---|---|
| 🌐 **Frontend (Vercel)** | https://cynbit-ai-assistant-17ai.vercel.app |
| ⚙️ **Backend (Render)** | https://cynbit-ai-assistant-3pry.onrender.com |
| 🔍 **API Health Check** | https://cynbit-ai-assistant-3pry.onrender.com/api/chat/health |
| 📦 **GitHub Repository** | https://github.com/VikashRaj-cmd/cynbit-ai-assistant |

---

## 🎯 Problem Statement

Cynbit's website contains valuable company information spread across multiple pages — Services, Products, Careers, BitElevate, and Contact. Visitors must navigate between pages to find answers, increasing friction and reducing engagement. High-intent visitors (potential clients or applicants) may leave before finding what they need.

## 💡 Proposed Improvement

A **persistent AI-powered chatbot** embedded on Cynbit's website that allows visitors to ask natural language questions and receive accurate, context-aware answers grounded in Cynbit's actual company data — all without leaving the current page.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 + Inline Styles |
| Backend | Node.js + Express 5 |
| Database | MongoDB Atlas (Mongoose) + In-Memory Fallback |
| AI Provider | Google Gemini 1.5 Flash (Free Tier) + Knowledge Base Fallback |
| API Communication | Axios |
| Icons | Lucide React |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## 📁 Project Structure

```
cynbit-ai-assistant/
├── client/                         # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWidget.jsx      # Main chat widget + state management
│   │   │   ├── ChatHeader.jsx      # Header with branding + controls
│   │   │   ├── MessageBubble.jsx   # Message rendering with markdown + links
│   │   │   ├── QuickActions.jsx    # Quick question pill buttons
│   │   │   ├── ChatInput.jsx       # Auto-resize textarea input
│   │   │   └── LeadForm.jsx        # Full-screen lead capture modal
│   │   ├── pages/
│   │   │   └── Home.jsx            # Demo landing page
│   │   ├── services/
│   │   │   └── chatService.js      # Axios API calls
│   │   ├── App.jsx
│   │   └── index.css               # Global styles + animations
│   ├── .env.example
│   ├── vercel.json                 # Vercel SPA routing config
│   └── vite.config.js
│
├── server/                         # Express backend
│   ├── config/db.js                # MongoDB + in-memory fallback
│   ├── controllers/chatController.js
│   ├── middleware/rateLimiter.js   # Rate limiting per IP
│   ├── models/
│   │   ├── Conversation.js         # Chat history schema
│   │   └── Lead.js                 # Lead capture schema
│   ├── routes/chatRoutes.js
│   ├── services/
│   │   ├── aiService.js            # Gemini + fallback engine
│   │   └── knowledgeBase.js        # Cynbit company knowledge base
│   ├── .env.example
│   └── server.js
│
├── render.yaml                     # Render deployment config
├── .gitignore
├── TECHNICAL_REPORT.md
└── README.md
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- Free Google Gemini API key from https://aistudio.google.com/app/apikey

### 1. Clone the repository
```bash
git clone https://github.com/VikashRaj-cmd/cynbit-ai-assistant.git
cd cynbit-ai-assistant
```

### 2. Backend setup
```bash
cd server
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm install
npm run dev
```

### 3. Frontend setup (new terminal)
```bash
cd client
npm install
npm run dev
```

### 4. Open browser
```
http://localhost:5173
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/chat/health` | Health check + database status |
| `POST` | `/api/chat/message` | Send a chat message |
| `GET` | `/api/chat/history/:sessionId` | Get conversation history |
| `POST` | `/api/chat/lead` | Submit contact lead |

---

## ✨ Key Features

- **Context-aware AI responses** grounded in Cynbit's real company data via knowledge base injection
- **Google Gemini Free Tier** — 100% free AI, no credit card required
- **Resilient fallback** — keyword-based knowledge base engine activates automatically if AI is unavailable
- **MongoDB Atlas + In-Memory fallback** — works with or without database
- **Lead capture modal** — full-screen professional form with intent selector, validation, and success state
- **Quick action buttons** — instant answers for Services, Products, Careers, BitElevate, Contact, Pricing
- **Clickable links** — every response links to relevant Cynbit pages
- **Conversation persistence** — session history saved to MongoDB
- **Rate limiting** — 50 requests/15 min per IP via express-rate-limit
- **Security** — Helmet.js headers, CORS whitelist, input validation
- **Responsive** — works on mobile, tablet, and desktop
- **Auto-open** — notification badge appears after 5 seconds to re-engage visitors

---

## 📊 Business Impact

| Metric | Impact |
|--------|--------|
| Time-to-information | Instant vs. multi-page navigation |
| Visitor engagement | Auto-opens after 5s inactivity |
| Lead generation | Captures name, email, intent from high-intent visitors |
| Support load | 24/7 automated answers without human intervention |
| Conversion | Direct links to Services, Careers, Contact pages |

---

## 🔒 Security

- API keys stored in environment variables — never committed to Git
- `.env` excluded via `.gitignore` at both root and server level
- Helmet.js sets secure HTTP headers
- CORS restricted to whitelisted origins only
- Rate limiting prevents abuse (50 req/15min chat, 5 req/hr leads)
- Input validation on all API endpoints

---

© 2026 Vikash Rajput — Technical Assessment for Cynbit Technologies

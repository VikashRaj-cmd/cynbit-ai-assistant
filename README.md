# Cynbit AI Assistant

> **Full Stack Developer Intern — Technical Assessment**  
> Submitted by: Vikash Rajput | Parul University | Vadodara, Gujarat  
> Assessment Reference: `cmux11mqw000004l58s3vqj6g`

---

## 🎯 Problem Statement

Cynbit's website contains valuable company information across multiple pages, but visitors must navigate between pages to find answers — increasing friction and reducing engagement. High-intent visitors (potential clients or applicants) may leave before finding what they need.

## 💡 Proposed Improvement

A **persistent AI-powered chatbot** that allows visitors to ask natural language questions and receive accurate, context-aware answers grounded in Cynbit's actual company data — all without leaving the current page.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Backend | Node.js + Express 5 |
| Database | MongoDB Atlas (Mongoose) + Resilient In-Memory Fallback |
| AI Options | Google Gemini (100% Free Tier) / OpenAI GPT / Built-in Knowledge Base Engine |
| API Communication | Axios |
| Icons | Lucide React |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

## 📁 Project Structure

```
cynbit-ai-assistant/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWidget.jsx      # Main chat widget
│   │   │   ├── ChatHeader.jsx      # Header with branding
│   │   │   ├── MessageBubble.jsx   # Message rendering
│   │   │   ├── QuickActions.jsx    # Quick question buttons
│   │   │   └── ChatInput.jsx       # Input textarea
│   │   ├── pages/
│   │   │   └── Home.jsx            # Demo landing page
│   │   ├── services/
│   │   │   └── chatService.js      # API calls
│   │   └── App.jsx
│   ├── .env.example
│   └── vite.config.js
│
├── server/                 # Express backend
│   ├── config/db.js        # MongoDB connection with resilient fallback
│   ├── controllers/chatController.js
│   ├── middleware/rateLimiter.js
│   ├── models/
│   │   ├── Conversation.js
│   │   └── Lead.js
│   ├── routes/chatRoutes.js
│   ├── services/
│   │   ├── aiService.js    # Multi-provider AI (Gemini/OpenAI) + fallback
│   │   └── knowledgeBase.js # Cynbit company data
│   ├── .env.example
│   └── server.js
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- (Optional) Free Google Gemini API Key or MongoDB Atlas account — runs 100% free out of the box!

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/VikashRaj-cmd/cynbit-ai-assistant.git
   cd cynbit-ai-assistant
   ```

2. **Backend setup**
   ```bash
   cd server
   cp .env.example .env
   # .env comes preconfigured; add GEMINI_API_KEY for free AI or run with built-in Knowledge Base
   npm run dev
   ```

3. **Frontend setup** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```

4. Open `http://localhost:5173`

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/chat/health` | Health check & database status |
| `POST` | `/api/chat/message` | Send a chat message |
| `GET` | `/api/chat/history/:sessionId` | Get conversation history |
| `POST` | `/api/chat/lead` | Submit contact lead |

## ✨ Key Features

- **Context-aware AI responses** grounded in Cynbit's real company data
- **100% Free Tier Ready** — works with Google Gemini Free Tier or zero-config Knowledge Base Engine
- **Resilient Fallback** — instant automatic fallback when AI quota is exceeded (HTTP 429)
- **MongoDB Atlas + In-Memory Fallback** — seamless local testing even without database configuration
- **Rate limiting** — 50 requests/15 min per IP with Helmet security
- **Quick action buttons** for common questions (Services, Products, Careers, BitElevate)
- **Clickable links** to relevant Cynbit pages
- **Lead capture** for visitors wanting human assistance
- **Responsive** — works on mobile, tablet, desktop

## 📊 Business Impact

- Reduces time-to-information for visitors
- Increases engagement (auto-opens after 5 seconds)
- Captures leads from high-intent visitors
- Provides 24/7 instant answers without human support

## 📝 Links

- **GitHub Repository:** [https://github.com/VikashRaj-cmd/cynbit-ai-assistant](https://github.com/VikashRaj-cmd/cynbit-ai-assistant)
- **Frontend (Vercel):** `[Deploy via Vercel]`
- **Backend (Render):** `[Deploy via Render]`

---

© 2026 Vikash Rajput — Assessment for Cynbit Technologies

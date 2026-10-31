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
| Backend | Node.js + Express |
| Database | MongoDB Atlas (Mongoose) |
| AI | OpenAI GPT API (gpt-4o-mini) |
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
│   ├── config/db.js        # MongoDB connection
│   ├── controllers/chatController.js
│   ├── middleware/rateLimiter.js
│   ├── models/
│   │   ├── Conversation.js
│   │   └── Lead.js
│   ├── routes/chatRoutes.js
│   ├── services/
│   │   ├── aiService.js    # OpenAI integration + fallback
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
- MongoDB Atlas account
- OpenAI API key

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cynbit-ai-assistant
   ```

2. **Backend setup**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your MongoDB URI and OpenAI API key
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
| `GET` | `/api/chat/health` | Health check |
| `POST` | `/api/chat/message` | Send a chat message |
| `GET` | `/api/chat/history/:sessionId` | Get conversation history |
| `POST` | `/api/chat/lead` | Submit contact lead |

## ✨ Key Features

- **Context-aware AI responses** grounded in Cynbit's real company data
- **Intelligent fallback** — keyword-based responses when AI is unavailable
- **MongoDB persistence** — conversations saved per session
- **Rate limiting** — 50 requests/15 min per IP
- **Quick action buttons** for common questions
- **Clickable links** to relevant Cynbit pages
- **Lead capture** for visitors wanting human assistance
- **Responsive** — works on mobile, tablet, desktop

## 📊 Business Impact

- Reduces time-to-information for visitors
- Increases engagement (auto-opens after 5 seconds)
- Captures leads from high-intent visitors
- Provides 24/7 instant answers without human support

## 📝 Live URLs

- **Frontend (Vercel):** `[Add after deployment]`
- **Backend (Render):** `[Add after deployment]`
- **GitHub:** `[Add repository link]`

---

© 2026 Vikash Rajput — Assessment for Cynbit Technologies

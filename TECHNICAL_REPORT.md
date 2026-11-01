# Technical Report — Cynbit AI Assistant

**Submitted by:** Vikash Rajput
**Institution:** Parul University, Vadodara, Gujarat
**Role Applied:** Full Stack Developer Intern
**Assessment Reference:** `cmux11mqw000004l58s3vqj6g`
**Submission Date:** November 2026

---

## 1. Problem Statement

### Observation
After analyzing Cynbit's website (https://www.cynbit.in/), I identified a friction point in the visitor experience: company information is distributed across multiple pages — Services, Products, BitElevate, Careers, and Contact. A visitor who wants to know "What AI services does Cynbit offer?" or "How do I apply for an internship?" must navigate between pages to find the answer.

### Impact
- High-intent visitors (potential clients, applicants) may leave before finding what they need
- No persistent entry point for visitor questions
- No mechanism to capture leads from engaged visitors outside the Contact page
- The existing Technical FAQ on the Contact page is static and requires manual navigation

### Proposed Improvement
A **persistent AI-powered chatbot** embedded on Cynbit's website that:
1. Answers visitor questions instantly using Cynbit's actual company data
2. Links visitors directly to relevant pages
3. Captures leads from visitors who want human follow-up
4. Works 24/7 without human support

---

## 2. Technical Stack & Decisions

### Frontend — React 19 + Vite 8
**Why React:** Component-based architecture is ideal for a chat widget — each part (header, messages, input, quick actions, lead form) is an isolated, reusable component. React's state management handles real-time message updates cleanly.

**Why Vite:** Faster build times than Create React App. Native ES modules in development. The proxy feature routes `/api` calls to the backend during local development without CORS issues.

### Styling — Tailwind CSS v4 + Inline Styles
Tailwind v4 handles global utilities and animations. Inline styles are used for layout-critical properties (positioning, dimensions, colors) to ensure consistent rendering regardless of Tailwind's JIT compilation behavior.

### Backend — Node.js + Express 5
**Why Express:** Minimal, flexible, and well-suited for a REST API of this scope. Express 5 includes async error handling improvements. The backend handles AI orchestration, conversation persistence, and lead capture.

### Database — MongoDB Atlas + In-Memory Fallback
**Why MongoDB:** Schema-flexible document model fits conversation history naturally — each conversation is a document with an array of message objects. The in-memory fallback means the app works perfectly in local development without any database configuration.

### AI — Google Gemini 1.5 Flash (Free Tier)
**Why Gemini:** 100% free tier with 15 requests/minute and 1500 requests/day — sufficient for a demo and real-world low-traffic deployment. No credit card required. The `gemini-1.5-flash` model is fast and accurate for Q&A tasks.

**AI Architecture Decision:** Rather than training a custom model, the Cynbit knowledge base is injected as a system prompt into every Gemini request. This approach is:
- Faster to implement
- Easier to update (edit one file)
- More accurate (grounded in verified data)
- More maintainable long-term

### Hosting
- **Vercel** for frontend — zero-config deployment for Vite/React, global CDN, free tier
- **Render** for backend — supports Node.js, environment variables, free tier with auto-deploy from GitHub

---

## 3. Architecture

```
Visitor Browser
      │
      ▼
React Frontend (Vercel)
  ChatWidget.jsx
      │  Axios POST /api/chat/message
      ▼
Express Backend (Render)
  chatRoutes.js → chatController.js
      │
      ├── generateAIResponse()
      │     ├── Gemini 1.5 Flash API
      │     │     └── System prompt = Cynbit Knowledge Base
      │     └── Fallback: getFallbackResponse() (keyword matching)
      │
      ├── Conversation.save() → MongoDB Atlas
      │
      └── res.json({ reply, sessionId })
```

### Fallback Chain
```
Request received
      │
      ▼
GEMINI_API_KEY present?
  Yes → Call Gemini API
          Success → return AI response
          Error   → fall through
      │
      ▼
OPENAI_API_KEY present?
  Yes → Call OpenAI API
          Success → return AI response
          Error   → fall through
      │
      ▼
throw AI_UNAVAILABLE
      │
      ▼
Controller catches → getFallbackResponse(message)
  → keyword matching against knowledge base
  → always returns a useful response
```

---

## 4. Implementation

### 4.1 Knowledge Base Design
The knowledge base (`server/services/knowledgeBase.js`) contains verified information from https://www.cynbit.in/ covering:
- Company overview and philosophy
- All 4 service areas with sub-details
- All 3 products (Cynbit Studio, TenantEase, Revio) with features
- BitElevate program details
- Careers and internship information
- Contact details (email, phone, address, social media)
- Case studies and social impact
- Response guidelines for the AI

This is injected as `systemInstruction` into every Gemini request, ensuring all responses are grounded in real Cynbit data.

### 4.2 Conversation Persistence
Each browser session gets a unique `sessionId` stored in `sessionStorage`. Every message exchange is saved to MongoDB under that session ID. The last 10 messages are sent as context with each new request, enabling multi-turn conversations.

### 4.3 Lead Capture
The "Talk to a Human" button opens a full-screen modal with:
- Name + Email (2-column grid)
- Intent selector (General / Project / Internship / Partnership)
- Message textarea
- Client-side validation
- Server-side validation + email regex check
- Saved to MongoDB `leads` collection
- Success confirmation screen

### 4.4 Rate Limiting
```
Chat endpoint:  50 requests / 15 minutes / IP
Lead endpoint:  5 submissions / 1 hour / IP
```

### 4.5 Security Implementation
- `helmet()` — sets 11 security-related HTTP headers
- CORS whitelist — only allows requests from known frontend origins
- Body size limit — `10kb` max request body
- Environment variables — all secrets in `.env`, excluded from Git
- Input validation — all required fields checked before processing

---

## 5. Component Architecture

| Component | Responsibility |
|-----------|---------------|
| `ChatWidget.jsx` | Root state manager — open/close, messages array, loading, lead form toggle |
| `ChatHeader.jsx` | Branding, online indicator, minimize/close controls |
| `MessageBubble.jsx` | Renders user + AI messages with markdown bold, clickable links, typing indicator |
| `QuickActions.jsx` | 6 pre-defined question pill buttons |
| `ChatInput.jsx` | Auto-resize textarea, Enter to send, loading spinner |
| `LeadForm.jsx` | Full-screen modal, form state, validation, API call, success state |
| `chatService.js` | Axios instance, all API call functions |

---

## 6. Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Gemini requires conversation to start with `user` role | Filter contents array to find first user message index before sending |
| Vite dev server port conflict (5173 → 5174) | Added port 5174 to CORS allowed origins |
| Render uses port 10000, not 5000 | Changed default PORT fallback to 10000 |
| Env vars not loading on Render | Set all variables manually in Render Environment dashboard |
| MongoDB connection optional for local dev | Implemented in-memory Map/Array fallback in controller |

---

## 7. Results

### Live Deployment
- **Frontend:** https://cynbit-ai-assistant-17ai.vercel.app
- **Backend:** https://cynbit-ai-assistant-3pry.onrender.com
- **Health Check:** https://cynbit-ai-assistant-3pry.onrender.com/api/chat/health

### Features Delivered
- ✅ AI chatbot with Cynbit knowledge base
- ✅ Google Gemini Free Tier integration
- ✅ Automatic fallback when AI unavailable
- ✅ MongoDB Atlas conversation persistence
- ✅ Lead capture with full-screen modal
- ✅ 6 quick action buttons
- ✅ Clickable links to Cynbit pages
- ✅ Rate limiting + security headers
- ✅ Responsive design
- ✅ Deployed on Vercel + Render

### Business Value
- Visitors get instant answers without navigating between pages
- High-intent visitors can submit contact details directly from the chat
- 24/7 availability without human support cost
- Every response links to relevant Cynbit pages, driving page visits

---

## 8. Future Improvements

- **Analytics dashboard** — track most asked questions, peak usage times
- **Admin panel** — view and respond to captured leads
- **Streaming responses** — show AI response word-by-word for better UX
- **Multi-language support** — detect visitor language and respond accordingly
- **Embeddable widget** — single `<script>` tag to embed on the actual cynbit.in website

---

© 2026 Vikash Rajput — Technical Assessment for Cynbit Technologies

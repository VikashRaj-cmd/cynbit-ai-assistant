# 📋 Manual Setup Guide — Phase 1

> **Do these steps AFTER Phase 1 code is committed to GitHub.**  
> These are one-time manual tasks that cannot be automated.

---

## ✅ Step 1: Create GitHub Repository

1. Go to → **https://github.com/new**
2. Fill in:
   - **Repository name:** `cynbit-ai-assistant`
   - **Description:** `AI-powered chatbot for Cynbit Technologies website | Full Stack Intern Assessment`
   - **Visibility:** ✅ Public
   - ❌ Do NOT initialize with README (we already have one)
   - ❌ Do NOT add .gitignore (we already have one)
3. Click **"Create repository"**
4. Copy your repository URL (e.g., `https://github.com/YourUsername/cynbit-ai-assistant.git`)

---

## ✅ Step 2: Initialize Git & Push Code

After creating the GitHub repo, run these commands one by one in your terminal inside `E:\CynBit Assessment`:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "feat: initialize MERN stack project with full folder structure, React frontend, Express backend, MongoDB models, AI service with knowledge base, and rate limiting"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/YOUR_USERNAME/cynbit-ai-assistant.git
```

```bash
git push -u origin main
```

> ⚠️ Replace `YOUR_USERNAME` with your actual GitHub username.

---

## ✅ Step 3: Choose Your AI Provider (100% Free Options Available)

You have **3 options** for AI, including completely free choices:

### Option A: Google Gemini (Recommended — 100% Free, No Credit Card Required)
1. Go to → **https://aistudio.google.com/app/apikey**
2. Sign in with any standard Google account.
3. Click **"Create API key"**.
4. Copy the generated key.
5. In `server/.env`, set:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-1.5-flash
   ```
*(Free tier allows up to 15 requests per minute at $0 cost!)*

### Option B: Built-in Knowledge Base Engine (100% Free, Zero Keys Needed)
- If you don't provide any API key, the chatbot automatically uses its **built-in Cynbit Knowledge Base Engine**.
- It provides rich, grounded answers regarding Cynbit's services, proprietary products (Studio, TenantEase, Revio), BitElevate, recruitment, and contact details with zero API costs!

### Option C: OpenAI API
- If you have OpenAI credits:
  ```env
  OPENAI_API_KEY=sk-proj-your-actual-api-key-here
  AI_MODEL=gpt-4o-mini
  ```
- *Note:* If quota is 0 (HTTP 429), the assistant automatically switches to the Knowledge Base engine without interrupting the user.

---

## ✅ Step 4: MongoDB Atlas (Optional for Local Testing)

> 💡 **Note:** If you skip MongoDB setup, the server automatically uses a **resilient in-memory store** so you can develop and test immediately with zero configuration!

To persist conversations and leads to the cloud:
1. Go to → **https://cloud.mongodb.com/**
2. Sign up / Sign in → choose **"M0 Free Tier"** (Free Forever)
3. Select region: **Mumbai (ap-south-1)**
4. Click **"Connect"** → **"Connect your application"**
5. Copy your connection string and add it to `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Under **Network Access**, ensure IP `0.0.0.0/0` (Allow Access from Anywhere) is enabled.

---

## ✅ Step 5: Server .env File

Your `E:\CynBit Assessment\server\.env` has already been generated:

```env
PORT=5000
NODE_ENV=development

# Optional - defaults to in-memory store if not provided:
# MONGODB_URI=mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

# Free Tier AI (Gemini):
# GEMINI_API_KEY=your_free_key

# OpenAI:
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
AI_MODEL=gpt-4o-mini

CLIENT_URL=http://localhost:5173
```

> ⚠️ This file is in `.gitignore` — it will NEVER be pushed to GitHub. Keep it safe.

---

## ✅ Step 6: Test Locally

Run both servers:

**Terminal 1 — Backend:**
```bash
cd "E:\CynBit Assessment\server"
npm run dev
```
You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Cynbit AI Assistant API running on port 5000
```

**Terminal 2 — Frontend:**
```bash
cd "E:\CynBit Assessment\client"
npm run dev
```

Open browser: **http://localhost:5173**

---

## ✅ Verification Checklist

- [ ] GitHub repo created and code pushed
- [ ] OpenAI API key obtained
- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] `server/.env` file created with all values filled in
- [ ] Backend starts without errors on port 5000
- [ ] Frontend loads at localhost:5173
- [ ] Chat bubble appears on bottom-right of page
- [ ] Clicking the chat bubble opens the assistant
- [ ] Sending a test message gets a response

---

## ⚠️ Important Security Reminders

- **NEVER** push `.env` files to GitHub
- **NEVER** share your OpenAI API key publicly
- The `.gitignore` file already excludes `.env` files
- Use `.env.example` files as templates (these are safe to commit)

---

Once all steps above are complete, reply **"Phase 1 done"** and we'll move to **Phase 2: Building the full chatbot UI**.

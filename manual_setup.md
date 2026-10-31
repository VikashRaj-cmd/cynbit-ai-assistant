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

## ✅ Step 3: Get OpenAI API Key

1. Go to → **https://platform.openai.com/api-keys**
2. Sign in or create an account
3. Click **"Create new secret key"**
4. Name it: `cynbit-assessment`
5. Copy the key (starts with `sk-proj-...`)

> ⚠️ You need to add a small credit ($5) for API access. Use **gpt-4o-mini** model — it's very cheap (~$0.15 per 1M tokens).

---

## ✅ Step 4: Set Up MongoDB Atlas

1. Go to → **https://cloud.mongodb.com/**
2. Sign up / Sign in
3. Click **"Create a New Cluster"** → choose **"M0 Free Tier"**
4. Select region: **Mumbai (ap-south-1)** or nearest
5. Name: `cynbit-cluster`
6. Wait for cluster to be created (~2-3 minutes)

**Get connection string:**
1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select **Driver: Node.js**, Version: latest
4. Copy the connection string — looks like:
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual database password

**Allow IP Access:**
1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** → Confirm
   > (For production, you'll restrict this to Render's IPs)

---

## ✅ Step 5: Create Server .env File

Inside `E:\CynBit Assessment\server\`, create a file named `.env`:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
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

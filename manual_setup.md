# Manual Setup Guide

> Complete these steps for Phase 1. Reply "Phase 1 done" when finished.

---

## Step 1: Revoke Your OpenAI Key (IMPORTANT)

Your `server/.env` contained a real OpenAI API key. Even though `.env` is gitignored, you should revoke it immediately as a precaution.

1. Go to → https://platform.openai.com/api-keys
2. Find the key and click **Revoke**
3. If you want to use OpenAI later, generate a new key

---

## Step 2: Get a Free Gemini API Key (Recommended — 100% Free)

No credit card. No billing. 15 requests/minute free forever.

1. Go to → https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API key"**
4. Copy the key

---

## Step 3: Set Up `server/.env`

Open `E:\CynBit Assessment\server\.env` and replace the contents with:

```env
PORT=5000
NODE_ENV=development

# Free Gemini AI (get key from https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash

# MongoDB Atlas (optional — app works without it using in-memory storage)
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

# Frontend URL for CORS
CLIENT_URL=http://localhost:5173
```

> This file is in `.gitignore` — it will NEVER be pushed to GitHub.

---

## Step 4: Install Dependencies

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd "E:\CynBit Assessment\server"
npm install
npm run dev
```

Expected output:
```
🚀 Cynbit AI Assistant API running on port 5000
⚠️  MONGODB_URI not found — Running with in-memory storage.
```

**Terminal 2 — Frontend:**
```bash
cd "E:\CynBit Assessment\client"
npm install
npm run dev
```

Open browser: **http://localhost:5173**

---

## Step 5: Verify Everything Works

- [ ] Chat bubble appears bottom-right of the page
- [ ] Clicking it opens the assistant window
- [ ] Quick action buttons (Services, Products, etc.) work
- [ ] Sending a message gets a response
- [ ] No errors in either terminal

---

## Optional: MongoDB Atlas (Free Tier)

Skip this for now — the app works perfectly without it.

If you want conversation persistence later:
1. Go to → https://cloud.mongodb.com/
2. Create a free **M0** cluster
3. Get the connection string and add it to `server/.env` as `MONGODB_URI`
4. Under **Network Access**, add `0.0.0.0/0`

---

Once all steps are done, reply **"Phase 1 done"** to start Phase 2.

# Phase 3 — Deployment Guide

Deploy order: **MongoDB Atlas → Render (backend) → Vercel (frontend)**

---

## Step 1: MongoDB Atlas (Free M0 Cluster)

1. Go to → https://cloud.mongodb.com/
2. Sign up / Sign in
3. Click **"Build a Database"** → choose **M0 FREE**
4. Provider: AWS | Region: **Mumbai (ap-south-1)**
5. Cluster name: `cynbit-cluster` → click **Create**
6. **Security Quickstart:**
   - Username: `cynbitadmin`
   - Password: generate a strong one — **copy it now**
   - Click **"Create User"**
7. **Network Access** → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`) → Confirm
8. Go to **Database** → click **Connect** → **Drivers**
9. Copy the connection string — looks like:
   ```
   mongodb+srv://cynbitadmin:<password>@cynbit-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
10. Replace `<password>` with your actual password — **save this string**

---

## Step 2: Deploy Backend to Render (Free)

1. Go to → https://render.com/ → Sign up with GitHub
2. Click **"New +"** → **Web Service**
3. Connect your GitHub repo: `cynbit-ai-assistant`
4. Configure:
   - **Name:** `cynbit-ai-assistant-api`
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Click **"Advanced"** → **Add Environment Variables** — add ALL of these:

   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `MONGODB_URI` | your Atlas connection string from Step 1 |
   | `GEMINI_API_KEY` | your Gemini API key |
   | `GEMINI_MODEL` | `gemini-1.5-flash` |
   | `CLIENT_URL` | *(leave blank for now — fill after Vercel deploy)* |

6. Click **"Create Web Service"**
7. Wait ~3 minutes for the first deploy
8. Copy your Render URL — looks like:
   ```
   https://cynbit-ai-assistant-api.onrender.com
   ```
9. Test it: open `https://cynbit-ai-assistant-api.onrender.com/api/chat/health` in browser
   - You should see: `{"success":true,"message":"Cynbit AI Assistant API is running.",...}`

---

## Step 3: Deploy Frontend to Vercel (Free)

1. Go to → https://vercel.com/ → Sign up with GitHub
2. Click **"Add New Project"**
3. Import your `cynbit-ai-assistant` repo
4. Configure:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **"Environment Variables"** → Add:

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://cynbit-ai-assistant-api.onrender.com/api/chat` |

6. Click **"Deploy"**
7. Wait ~2 minutes
8. Copy your Vercel URL — looks like:
   ```
   https://cynbit-ai-assistant.vercel.app
   ```

---

## Step 4: Update CORS on Render

Now that you have your Vercel URL, go back to Render:

1. Open your web service → **Environment**
2. Update `CLIENT_URL` to your Vercel URL:
   ```
   https://cynbit-ai-assistant.vercel.app
   ```
3. Render will auto-redeploy

---

## Step 5: Final Verification

Test the live app end-to-end:

- [ ] Open your Vercel URL in browser
- [ ] Page loads correctly with the demo landing page
- [ ] Chat bubble appears bottom-right
- [ ] Click bubble → chat opens
- [ ] Send a message → AI responds (Gemini)
- [ ] Quick action buttons work
- [ ] "Talk to a human" → modal opens → submit form → success screen
- [ ] Visit `https://your-render-url.onrender.com/api/chat/health` → shows connected

---

## Important Notes

- Render free tier **spins down after 15 min of inactivity** — first message after idle takes ~30 seconds to respond. This is normal on free tier.
- MongoDB M0 free tier has 512MB storage — more than enough for this project.
- Gemini free tier: 15 requests/minute, 1500 requests/day — plenty for demo purposes.

---

Once deployed, reply **"Phase 3 done"** with your two live URLs and we move to Phase 4 (README + Technical Report for submission).

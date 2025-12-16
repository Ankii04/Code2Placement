# 🚀 Deploy Backend on Render - Step by Step

## ⏱️ Time: 10 minutes | Difficulty: Easy

---

## Step 1: Go to Render (2 minutes)

### 1.1 Open Render
Go to: **[https://render.com](https://render.com)**

### 1.2 Sign Up/Sign In
- Click **"Get Started for Free"**
- Choose **"Sign in with GitHub"**
- Authorize Render to access your GitHub

---

## Step 2: Create Web Service (3 minutes)

### 2.1 Create New Service
1. Click **"New +"** (top right)
2. Select **"Web Service"**

### 2.2 Connect Repository
1. Find **"Code2Placement"** in the list
2. Click **"Connect"**

(If you don't see it, click "Configure account" and give Render access)

### 2.3 Configure Service

Fill in these fields:

**Name:**
```
code2placement-api
```

**Region:**
```
Choose closest to you (e.g., Oregon, Frankfurt, Singapore)
```

**Root Directory:**
```
server
```
⚠️ **Important!** This tells Render to only deploy the server folder

**Environment:**
```
Node
```

**Branch:**
```
main
```

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Instance Type:**
```
Free
```

---

## Step 3: Add Environment Variables (3 minutes)

Scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"** for each:

### Variable 1: MONGODB_URI
- **Key:** `MONGODB_URI`
- **Value:** Your MongoDB connection string
```
mongodb+srv://username:password@cluster.mongodb.net/code2placement?retryWrites=true&w=majority
```

### Variable 2: JWT_SECRET
- **Key:** `JWT_SECRET`
- **Value:** Your JWT secret (same one from Vercel)

### Variable 3: NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`

### Variable 4: GEMINI_API_KEY
- **Key:** `GEMINI_API_KEY`
- **Value:** Your Gemini API key

### Variable 5: ADMIN_EMAIL
- **Key:** `ADMIN_EMAIL`
- **Value:** `admin@yourdomain.com`

### Variable 6: ADMIN_PASSWORD
- **Key:** `ADMIN_PASSWORD`
- **Value:** Your admin password

### Variable 7: CLIENT_URL
- **Key:** `CLIENT_URL`
- **Value:** `https://code2-placement.vercel.app`
(Your Vercel frontend URL)

---

## Step 4: Deploy! (2 minutes)

### 4.1 Create Service
Click **"Create Web Service"** at the bottom

### 4.2 Wait for Build
You'll see:
```
Building...
Installing dependencies...
Starting server...
```

This takes about 2-3 minutes.

### 4.3 Get Your URL
Once deployed, you'll get a URL like:
```
https://code2placement-api.onrender.com
```

**Copy this URL!** You'll need it for the next step.

---

## Step 5: Update Frontend to Use Backend (2 minutes)

### 5.1 Update Vercel Environment Variables

Go to Vercel Dashboard:
1. Your project → **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Add this variable:

**Key:** `VITE_API_URL`
**Value:** `https://code2placement-api.onrender.com` (your Render URL)
**Environments:** ✅ Production ✅ Preview ✅ Development

4. Click **Save**

### 5.2 Update API Configuration

We need to update the client to use the environment variable.

I'll do this for you in the next step!

---

## ✅ Checklist:

- [ ] Signed up on Render
- [ ] Created Web Service
- [ ] Set Root Directory to `server`
- [ ] Added all 7 environment variables
- [ ] Clicked "Create Web Service"
- [ ] Got Render URL (e.g., `https://code2placement-api.onrender.com`)
- [ ] Added `VITE_API_URL` to Vercel
- [ ] Ready for next step!

---

## 🎯 What You Should See:

### On Render Dashboard:
```
✓ Build successful
✓ Deploy live
● Your service is live at https://code2placement-api.onrender.com
```

### Test Your Backend:
Open in browser:
```
https://code2placement-api.onrender.com/api/health
```

Should see:
```json
{"status": "ok", "message": "API is running"}
```

---

## 🐛 Troubleshooting:

### Build Failed?
- Check Root Directory is set to `server`
- Check Build Command is `npm install`
- Check Start Command is `npm start`

### Can't Connect to MongoDB?
- Check MONGODB_URI is correct
- Check MongoDB Atlas allows 0.0.0.0/0

### Service Won't Start?
- Check all environment variables are set
- Check Render logs for errors

---

## 📞 After Backend is Live:

**Tell me when you have your Render URL!**

Then I'll:
1. Update your client code to use the backend
2. Push changes to GitHub
3. Vercel will auto-redeploy
4. **Your full app will be live!** 🎉

---

## ⏱️ Current Progress:

- ✅ Frontend deployed on Vercel
- ⏳ Backend deploying on Render (you're doing this now!)
- ⏳ Connect frontend to backend (next step)
- ⏳ Test everything (final step)

**You're almost there!** 🚀

Start with Step 1 and let me know when you have your Render URL!

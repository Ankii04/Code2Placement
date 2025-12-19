# 🔧 Registration Failed - Quick Fix

## What's Happening:

The frontend is loading ✅ but can't connect to the backend ❌

This means you need to add the backend URL to Vercel!

---

## ✅ Quick Fix - Add Backend URL to Vercel:

### Step 1: Get Your Render URL

From Render dashboard, copy your backend URL:
```
https://code2placement-api-XXXX.onrender.com
```

### Step 2: Add to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project: **"code2-placement"**
3. Click **"Settings"** (top menu)
4. Click **"Environment Variables"** (left sidebar)
5. Click **"Add New"**

**Add this variable:**
- **Key:** `VITE_API_URL`
- **Value:** `https://your-render-url.onrender.com` (your actual Render URL)
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

### Step 3: Redeploy

After saving:
1. Go to **"Deployments"** tab
2. Click **"..."** (three dots) on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

### Step 4: Test Again

1. Clear browser cache (Ctrl+Shift+Delete)
2. Refresh the page
3. Try registering again
4. Should work! ✅

---

## 🔍 Alternative: Check if Backend is Running

### Test Backend Directly:

Open in browser:
```
https://your-render-url.onrender.com/api/health
```

**Should see:**
- Response (might take 30-60 seconds on first request)
- JSON data or "OK" message

**If you see error:**
- Backend isn't running
- Check Render logs
- Verify all environment variables are set

---

## 📊 Common Issues:

### Issue 1: "Registration failed"
**Cause:** Frontend can't reach backend
**Fix:** Add `VITE_API_URL` to Vercel

### Issue 2: Backend takes forever
**Cause:** Cold start (Render free tier)
**Fix:** Wait 30-60 seconds, then try again

### Issue 3: CORS error in console
**Cause:** Backend `CLIENT_URL` not set correctly
**Fix:** Update `CLIENT_URL` in Render to your Vercel URL

---

## ✅ Checklist:

**Vercel:**
- [ ] `VITE_API_URL` added
- [ ] Value is your Render URL
- [ ] All environments selected
- [ ] Redeployed

**Render:**
- [ ] Backend is deployed
- [ ] All 7 environment variables set
- [ ] Service is running (green status)
- [ ] Can access `/api/health`

---

## 🎯 After Adding VITE_API_URL:

1. **Vercel redeploys** (2-3 min)
2. **Clear browser cache**
3. **Try registration again**
4. **Should work!** ✅

---

## 📞 What's Your Render URL?

Share your Render backend URL and I'll help verify the connection!

Format: `https://code2placement-api-XXXX.onrender.com`

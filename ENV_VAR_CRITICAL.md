# 🚨 CRITICAL: Environment Variable Not Working

## The Problem:

The request is going to **Vercel** instead of **Render**:
```
POST https://code2-placement...vercel.app/api/auth/register
```

This means `VITE_API_URL` is NOT being used!

---

## ✅ Solution: Double-Check Vercel Setup

### Step 1: Verify Environment Variable Name

Go to Vercel → Settings → Environment Variables

**Must be EXACTLY:**
```
VITE_API_URL
```

**NOT:**
- `VITE-API-URL` ❌
- `VITE_API_URL_` ❌
- `API_URL` ❌
- Any other variation ❌

### Step 2: Verify Value

Value must be:
```
https://your-render-url.onrender.com/api
```

Example:
```
https://code2placement-api.onrender.com/api
```

### Step 3: Verify Environments Selected

Must have ALL THREE checked:
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 4: Force Redeploy

After saving:
1. Go to **Deployments**
2. Click **...** on latest
3. Click **"Redeploy"**
4. **Check "Use existing Build Cache"** is UNCHECKED
5. Click **"Redeploy"**

---

## 🔍 How to Verify It's Working:

### After Vercel Redeploys:

1. Open your Vercel app
2. Open browser console (F12)
3. Type:
```javascript
console.log(import.meta.env.VITE_API_URL)
```

**Should show:**
```
https://your-render-url.onrender.com/api
```

**If it shows `undefined`:**
- Environment variable not set correctly
- Or Vercel didn't rebuild
- Or name is wrong

---

## ⚡ Alternative: Hardcode for Testing

If env variable keeps failing, temporarily hardcode it:

**File:** `client/src/services/api.js`

Change line 4 from:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
```

To:
```javascript
const API_BASE_URL = 'https://your-actual-render-url.onrender.com/api';
```

Then:
1. Push to GitHub
2. Vercel auto-redeploys
3. Will work immediately

**But this is temporary!** Fix the env variable properly after.

---

## 📋 Checklist:

- [ ] Environment variable named **exactly** `VITE_API_URL`
- [ ] Value is `https://your-render-url.onrender.com/api`
- [ ] All 3 environments selected
- [ ] Clicked Save
- [ ] Redeployed WITHOUT cache
- [ ] Waited for deployment to finish
- [ ] Cleared browser cache
- [ ] Hard refreshed (Ctrl+F5)

---

## 🎯 What's Happening:

**Current:** Request goes to Vercel (wrong!)
```
https://code2-placement...vercel.app/api/auth/register ❌
```

**Should be:** Request goes to Render (correct!)
```
https://your-render-url.onrender.com/api/auth/register ✅
```

---

## 📞 Next Steps:

1. **Screenshot your Vercel environment variables** and show me
2. **Tell me your Render URL**
3. I'll verify everything is correct

OR

**Hardcode the URL temporarily** so we can test if everything else works!

The environment variable setup is the last blocker!

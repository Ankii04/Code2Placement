# 🔧 405 Error - API URL Fix

## The Problem:

The frontend is trying to call `/api/auth/register` as a relative path, which means `VITE_API_URL` isn't being used.

This happens because:
1. Vercel hasn't redeployed yet with the new env variable, OR
2. The `VITE_API_URL` value is incorrect

---

## ✅ Fix: Check VITE_API_URL Value

### What It Should Be:

```
https://your-render-url.onrender.com/api
```

**Important:** Include `/api` at the end!

### Example:
```
https://code2placement-api-abc123.onrender.com/api
```

---

## 🔍 Verify in Vercel:

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Find `VITE_API_URL`
3. **Check the value ends with `/api`**

### If It's Missing `/api`:

1. Click **Edit** on `VITE_API_URL`
2. Add `/api` to the end
3. Click **Save**
4. Go to Deployments → Redeploy

### If It's Correct:

Vercel just needs to redeploy:
1. Go to Deployments
2. Click **...** → **Redeploy**
3. Wait 2-3 minutes

---

## 🧪 Test the URL:

Open in browser:
```
https://your-render-url.onrender.com/api/health
```

Should see:
```json
{"status":"OK","message":"Server is running"}
```

If this works, then add `/api` to your `VITE_API_URL` in Vercel!

---

## ⏱️ After Fixing:

1. **Update `VITE_API_URL`** (add `/api` if missing)
2. **Redeploy Vercel** (2-3 min)
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Hard refresh** (Ctrl+F5)
5. **Try registration** - will work! ✅

---

## 📋 Correct Configuration:

**Vercel Environment Variable:**
- Key: `VITE_API_URL`
- Value: `https://your-render-url.onrender.com/api` ← Must end with `/api`
- Environments: All three selected

---

## 🎯 Quick Check:

**Open browser console (F12) and type:**
```javascript
console.log(import.meta.env.VITE_API_URL)
```

**Should show:**
```
https://your-render-url.onrender.com/api
```

**If it shows `undefined`:**
- Vercel hasn't redeployed yet
- Wait for deployment to finish
- Then hard refresh

---

## 📞 What's Your VITE_API_URL Value?

Tell me exactly what you put in Vercel for `VITE_API_URL` and I'll verify it's correct!

Format should be:
```
https://code2placement-api-XXXX.onrender.com/api
```

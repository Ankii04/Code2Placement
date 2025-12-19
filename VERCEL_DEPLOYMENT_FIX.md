# 🚀 Vercel Separate Deployment - 404 Error Fix

## 🔍 Problem
When deploying frontend and backend separately on Vercel, you get a **404 (Not Found)** error because the frontend can't find the backend API endpoints.

## ✅ Solution

### **1. Backend Deployment (Already Done)**
Your backend is deployed with all API routes starting with `/api/`:
- `/api/auth/*`
- `/api/topics/*`
- `/api/questions/*`
- etc.

**Backend URL Example:** `https://code2placement-backend.vercel.app`

---

### **2. Frontend Environment Variables**

#### **In Vercel Dashboard (Frontend Project):**

Go to: **Settings → Environment Variables**

Add/Update these variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `VITE_API_URL` | `https://your-backend-deployment.vercel.app/api` | Production, Preview, Development |
| `FRONTEND_URL` | `https://your-frontend-deployment.vercel.app` | (Optional, for backend CORS) |

**⚠️ Important:** Replace the URLs with your actual Vercel deployment URLs!

---

### **3. Backend Environment Variables**

#### **In Vercel Dashboard (Backend Project):**

Go to: **Settings → Environment Variables**

Add this variable:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `FRONTEND_URL` | `https://your-frontend-deployment.vercel.app` | Production, Preview, Development |
| `MONGODB_URI` | `your-mongodb-connection-string` | Production, Preview, Development |
| `JWT_SECRET` | `your-jwt-secret` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `ADMIN_EMAIL` | `your-admin-email` | Production, Preview, Development |
| `ADMIN_PASSWORD` | `your-admin-password` | Production, Preview, Development |
| `GEMINI_API_KEY` | `your-gemini-api-key` | Production, Preview, Development |

---

### **4. Redeploy Both Projects**

After updating environment variables:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** button
4. Do this for BOTH frontend and backend

---

## 🧪 Testing

### **Test Backend Directly:**
```bash
curl https://your-backend-deployment.vercel.app/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### **Test Frontend:**
1. Open your frontend URL
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Look for: `API Base URL: https://your-backend-deployment.vercel.app/api`
5. Try logging in or making an API call
6. Check **Network** tab to see if requests go to the correct backend URL

---

## 🐛 Common Issues

### **Issue 1: Still getting 404**
**Solution:** Make sure `VITE_API_URL` includes `/api` at the end:
```
✅ Correct: https://backend.vercel.app/api
❌ Wrong: https://backend.vercel.app
```

### **Issue 2: CORS Error**
**Solution:** Add `FRONTEND_URL` to backend environment variables and redeploy backend.

### **Issue 3: Environment variables not working**
**Solution:** 
- Verify variables are set for the correct environment (Production/Preview)
- Redeploy after changing environment variables
- Clear browser cache

### **Issue 4: Backend routes not found**
**Solution:** Check `server/vercel.json` routes configuration matches your API structure.

---

## 📝 Quick Checklist

- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] `VITE_API_URL` set in frontend Vercel settings
- [ ] `FRONTEND_URL` set in backend Vercel settings (optional but recommended)
- [ ] Both projects redeployed after environment variable changes
- [ ] Test backend health endpoint
- [ ] Test frontend API calls in browser DevTools

---

## 🎯 Expected Result

After following these steps:
- Frontend should successfully call backend APIs
- No 404 errors
- Login, registration, and all features work correctly
- CORS errors resolved

---

## 📞 Need Help?

If you're still facing issues:
1. Check browser Console for exact error messages
2. Check Network tab to see which URL is being called
3. Verify backend logs in Vercel dashboard
4. Make sure MongoDB connection is working

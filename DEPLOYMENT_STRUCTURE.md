# 🏗️ Project Structure for Vercel Deployment

## 📁 Directory Structure

```
Code2Placement/
├── api/
│   └── index.js                    # ⭐ Vercel entry point (wrapper)
├── server/
│   ├── api/
│   │   └── index.js                # 🚀 Main Express app
│   ├── config/
│   ├── models/
│   ├── utils/
│   ├── package.json
│   └── vercel.json                 # (Not used for deployment)
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── package.json                    # ⭐ Root package.json (for Vercel)
├── vercel.json                     # ⭐ Root Vercel config
└── .env
```

## 🔗 How It Works

### **Backend Deployment Flow:**

1. **Vercel reads:** `vercel.json` at root
2. **Vercel builds:** `api/index.js` (the wrapper)
3. **Wrapper imports:** `server/api/index.js` (the actual Express app)
4. **Express app exports:** The configured app with all routes

### **File Connections:**

```
vercel.json (root)
    ↓
api/index.js (wrapper)
    ↓
server/api/index.js (Express app)
    ↓
All route files (auth.js, topics.js, etc.)
```

## ✅ Current Setup (CORRECT)

### **1. Root `vercel.json`**
```json
{
    "version": 2,
    "builds": [
        {
            "src": "api/index.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/api/(.*)",
            "dest": "api/index.js"
        },
        {
            "src": "/(.*)",
            "dest": "api/index.js"
        }
    ]
}
```

### **2. Wrapper `api/index.js`**
```javascript
// Serverless function wrapper for Express app
import app from '../server/api/index.js';

export default app;
```

### **3. Main App `server/api/index.js`**
- Contains all Express configuration
- Imports all routes
- Exports the app
- Has CORS, middleware, database connection

## 🚀 Deployment Steps

### **For Backend (Vercel):**

1. **Create New Project in Vercel**
   - Import from GitHub
   - Select the repository
   - **Root Directory:** Leave as `.` (root)
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

2. **Environment Variables (Backend)**
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   NODE_ENV=production
   ADMIN_EMAIL=your-admin-email
   ADMIN_PASSWORD=your-admin-password
   GEMINI_API_KEY=your-gemini-api-key
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy the deployment URL (e.g., `https://code2placement-backend.vercel.app`)

### **For Frontend (Vercel):**

1. **Create New Project in Vercel**
   - Import from GitHub (same repo or different)
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

2. **Environment Variables (Frontend)**
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

## 🧪 Testing

### **Test Backend:**
```bash
# Health check
curl https://your-backend.vercel.app/api/health

# Expected response:
# {"status":"OK","message":"Server is running"}
```

### **Test Frontend:**
1. Open `https://your-frontend.vercel.app`
2. Open DevTools Console (F12)
3. Look for: `API Base URL: https://your-backend.vercel.app/api`
4. Try logging in
5. Check Network tab for API calls

## 🐛 Common Issues & Solutions

### **Issue: 404 on API calls**
**Cause:** `VITE_API_URL` not set or incorrect
**Solution:** 
- Go to Frontend Vercel project → Settings → Environment Variables
- Set `VITE_API_URL=https://your-backend.vercel.app/api`
- Redeploy frontend

### **Issue: CORS errors**
**Cause:** Backend doesn't allow frontend origin
**Solution:**
- Go to Backend Vercel project → Settings → Environment Variables
- Set `FRONTEND_URL=https://your-frontend.vercel.app`
- Redeploy backend

### **Issue: "Cannot find module" errors**
**Cause:** Dependencies not installed or wrong import paths
**Solution:**
- Check `package.json` has all dependencies
- Verify import paths use `.js` extensions
- Redeploy

### **Issue: MongoDB connection fails**
**Cause:** `MONGODB_URI` not set or IP not whitelisted
**Solution:**
- Set `MONGODB_URI` in Vercel environment variables
- In MongoDB Atlas, whitelist `0.0.0.0/0` (allow all IPs)
- Redeploy

## 📝 Deployment Checklist

### **Backend:**
- [ ] `vercel.json` exists at root
- [ ] `api/index.js` wrapper exists
- [ ] `server/api/index.js` exports app
- [ ] All environment variables set in Vercel
- [ ] MongoDB IP whitelist configured
- [ ] Deployed successfully
- [ ] Health endpoint works

### **Frontend:**
- [ ] `VITE_API_URL` set in Vercel
- [ ] Points to correct backend URL
- [ ] Deployed successfully
- [ ] Can see API URL in console
- [ ] API calls work

## 🎯 Expected URLs

After deployment:
- **Backend:** `https://code2placement-backend.vercel.app`
- **Frontend:** `https://code2placement-frontend.vercel.app`
- **API Endpoint Example:** `https://code2placement-backend.vercel.app/api/auth/login`

## 💡 Pro Tips

1. **Separate Repos:** Consider using separate repos for frontend and backend for cleaner deployments
2. **Environment-specific configs:** Use different environment variables for Preview vs Production
3. **Logs:** Check Vercel deployment logs if something fails
4. **Local Testing:** Test locally with production-like URLs before deploying
5. **CORS:** Start with permissive CORS, then tighten after confirming it works

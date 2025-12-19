# ✅ Vercel Deployment Checklist

## 📦 Files Ready for Deployment

### ✅ Backend Files (All Set!)
- [x] `api/index.js` - Wrapper file that imports server/api/index.js
- [x] `server/api/index.js` - Main Express app with all routes
- [x] `vercel.json` - Vercel configuration at root
- [x] `package.json` - Root package.json with dependencies
- [x] `server/package.json` - Server dependencies
- [x] CORS configured to accept frontend requests

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment - Fixed structure"
git push origin main
```

### Step 2: Deploy Backend to Vercel

1. **Go to Vercel Dashboard** → New Project
2. **Import Repository** from GitHub
3. **Configure Project:**
   - Framework Preset: **Other**
   - Root Directory: **`.`** (root, not server/)
   - Build Command: `npm run build`
   - Output Directory: (leave empty)
   - Install Command: `npm install`

4. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your-admin-password
   GEMINI_API_KEY=your-gemini-api-key
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

5. **Click Deploy**

6. **Copy Backend URL** (e.g., `https://code2placement-api.vercel.app`)

### Step 3: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard** → New Project
2. **Import Same Repository** (or separate frontend repo)
3. **Configure Project:**
   - Framework Preset: **Vite**
   - Root Directory: **`frontend`**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables:**
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```
   ⚠️ **Important:** Replace with YOUR actual backend URL from Step 2!

5. **Click Deploy**

### Step 4: Update Backend with Frontend URL

1. Go back to **Backend Project** in Vercel
2. Settings → Environment Variables
3. Update `FRONTEND_URL` with your actual frontend URL
4. Redeploy backend

### Step 5: Test Everything

#### Test Backend:
```bash
# Health check
curl https://your-backend.vercel.app/api/health

# Should return:
# {"status":"OK","message":"Server is running"}
```

#### Test Frontend:
1. Open `https://your-frontend.vercel.app`
2. Press F12 (DevTools)
3. Go to Console tab
4. Look for: `API Base URL: https://your-backend.vercel.app/api`
5. Try to register/login
6. Check Network tab - API calls should go to backend URL

## 🐛 Troubleshooting

### Issue: 404 on API Calls
**Solution:**
- Check `VITE_API_URL` in frontend Vercel settings
- Make sure it ends with `/api`
- Redeploy frontend

### Issue: CORS Error
**Solution:**
- Check `FRONTEND_URL` in backend Vercel settings
- Make sure it matches your frontend URL exactly
- Redeploy backend

### Issue: MongoDB Connection Error
**Solution:**
- Check `MONGODB_URI` is correct
- In MongoDB Atlas: Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
- Redeploy backend

### Issue: 500 Internal Server Error
**Solution:**
- Check Vercel deployment logs
- Make sure all environment variables are set
- Check if all dependencies are in package.json

### Issue: Build Failed
**Solution:**
- Check Vercel build logs for specific error
- Make sure `package.json` has all dependencies
- Verify Node version is >=18.x

## 📝 Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] Backend health endpoint returns OK
- [ ] Frontend shows correct API URL in console
- [ ] Can register new user
- [ ] Can login
- [ ] Can view DSA topics
- [ ] Can view questions
- [ ] All features working

## 🎯 Expected URLs

After successful deployment:

| Service | URL Example |
|---------|-------------|
| Backend API | `https://code2placement-api.vercel.app` |
| Frontend | `https://code2placement.vercel.app` |
| Health Check | `https://code2placement-api.vercel.app/api/health` |
| Login API | `https://code2placement-api.vercel.app/api/auth/login` |
| Topics API | `https://code2placement-api.vercel.app/api/topics` |

## 💡 Pro Tips

1. **Custom Domain:** You can add a custom domain in Vercel settings
2. **Preview Deployments:** Every git push creates a preview deployment
3. **Logs:** Check Function Logs in Vercel for debugging
4. **Analytics:** Enable Vercel Analytics for insights
5. **Environment Variables:** Use different values for Preview vs Production

## 🎉 Success!

Once all checkboxes are checked, your app is fully deployed and working!

**Share your deployed URLs:**
- Frontend: ___________________________
- Backend: ___________________________

---

Need help? Check these files:
- `CONNECTION_EXPLAINED.md` - Understand the file structure
- `DEPLOYMENT_STRUCTURE.md` - Detailed deployment guide
- `VERCEL_DEPLOYMENT_FIX.md` - Fix common issues

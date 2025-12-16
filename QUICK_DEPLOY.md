# ⚡ Quick Deploy Guide - 5 Minutes to Live!

## 🎯 Simple 2-Phase Deployment

### Phase 1: First Deployment (3 minutes)

#### Step 1: Go to Vercel
1. Open [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Find **"Code2Placement"**
5. Click **"Import"**

#### Step 2: Add 3 Environment Variables

**Before clicking deploy**, add these:

**Variable 1: MONGODB_URI**
```
mongodb+srv://username:password@cluster.mongodb.net/code2placement
```
Get from MongoDB Atlas → Database → Connect

**Variable 2: JWT_SECRET**
```
Run this command to generate:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

Copy the output
```

**Variable 3: NODE_ENV**
```
production
```

**For each variable:**
- Environments: ✅ Production ✅ Preview ✅ Development
- Click **Add**

#### Step 3: Deploy
Click **"Deploy"** and wait 2-3 minutes

You'll get a URL like: `https://code2placement-xyz.vercel.app`

---

### Phase 2: Add CLIENT_URL (2 minutes)

#### Step 1: Copy Your URL
After deployment, copy your Vercel URL

#### Step 2: Add CLIENT_URL Variable
1. Go to **Settings** → **Environment Variables**
2. Click **"Add New"**
3. **Key:** `CLIENT_URL`
4. **Value:** Your Vercel URL (e.g., `https://code2placement-xyz.vercel.app`)
5. **Environments:** ✅ All three
6. Click **Save**

#### Step 3: Redeploy
1. Go to **Deployments**
2. Click **...** on latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

---

## ✅ Done!

Your app is now live! 🎉

**Test it:**
- Visit your Vercel URL
- Register an account
- Login
- Explore DSA topics

---

## 🐛 If Something Breaks:

### MongoDB Connection Error:
1. Go to MongoDB Atlas
2. **Security** → **Network Access**
3. Add IP: `0.0.0.0/0` (allow all)

### API Not Working:
1. Check all 4 environment variables are set
2. Check MongoDB URI is correct
3. Redeploy

### Build Failed:
1. Check Vercel build logs
2. Make sure you pushed latest code to GitHub

---

## 📋 Checklist:

**Phase 1:**
- [ ] Imported repo to Vercel
- [ ] Added MONGODB_URI
- [ ] Added JWT_SECRET
- [ ] Added NODE_ENV
- [ ] Clicked Deploy
- [ ] Got Vercel URL

**Phase 2:**
- [ ] Added CLIENT_URL
- [ ] Redeployed
- [ ] Tested app

---

## 🎯 That's It!

**Total Time:** 5 minutes
**Result:** Live app on Vercel! 🚀

Your app: `https://your-app.vercel.app`

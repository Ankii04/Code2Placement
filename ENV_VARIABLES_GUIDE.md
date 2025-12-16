# 🔐 Environment Variables - Quick Reference

## Copy-Paste These in Vercel Dashboard

### IMPORTANT: Deploy Order

**You DON'T need to deploy client first!**

Deploy everything together, then update `CLIENT_URL` after you get your Vercel URL.

---

## 🚀 Initial Deployment (Set These First):

### 1. MONGODB_URI ⭐ REQUIRED
```
mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/code2placement?retryWrites=true&w=majority
```
**Get from:** MongoDB Atlas → Database → Connect → Connect your application

**Important:** 
- Replace YOUR_USERNAME, YOUR_PASSWORD, YOUR_CLUSTER
- Whitelist IP: `0.0.0.0/0` in MongoDB Atlas → Network Access

---

### 2. JWT_SECRET ⭐ REQUIRED
```
Generate using this command:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
**Example output:** `xK7mP9nQ2wR5tY8uI1oP3aS6dF9gH2jK5lM8nB4vC7x=`

**Use the generated string as your JWT_SECRET**

---

### 3. NODE_ENV ⭐ REQUIRED
```
production
```

---

### 4. CLIENT_URL ⚠️ SKIP FOR NOW
```
Leave this empty for first deployment!
```
**Why?** You'll get this URL AFTER deployment.

**What to do:**
1. Deploy WITHOUT this variable
2. Get your Vercel URL (e.g., `https://code2placement-xyz.vercel.app`)
3. Come back and add this variable
4. Redeploy

---

### 5. ADMIN_EMAIL (Optional)
```
admin@yourdomain.com
```

---

### 6. ADMIN_PASSWORD (Optional)
```
YourStrongPassword123!
```

---

## 📋 Step-by-Step Deployment:

### Phase 1: First Deployment (5 minutes)

**Set These Variables:**
1. ✅ `MONGODB_URI` - Your MongoDB connection string
2. ✅ `JWT_SECRET` - Generated random string
3. ✅ `NODE_ENV` - Set to `production`
4. ❌ `CLIENT_URL` - **SKIP THIS** for now

**Then Click "Deploy"**

### Phase 2: After First Deployment (2 minutes)

**You'll get a URL like:**
```
https://code2placement-abc123.vercel.app
```

**Now:**
1. Go to **Settings** → **Environment Variables**
2. Click **"Add New"**
3. **Key:** `CLIENT_URL`
4. **Value:** `https://code2placement-abc123.vercel.app` (your actual URL)
5. **Environments:** Select all (Production, Preview, Development)
6. Click **Save**

**Then:**
1. Go to **Deployments**
2. Click **...** (three dots) on latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

**Done!** ✅

---

## 🎯 Why This Works:

### Without CLIENT_URL:
- Your app will still work! ✅
- CORS will allow all origins temporarily
- Backend will function normally

### With CLIENT_URL:
- Better security 🔒
- Proper CORS configuration
- Production-ready

---

## 📝 Vercel Dashboard Steps:

### Initial Setup:

1. **Go to your project in Vercel**
2. **Before deploying**, click **"Environment Variables"**
3. **Add these 3 variables:**

   **Variable 1:**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://...` (your connection string)
   - Environments: ✅ Production ✅ Preview ✅ Development
   - Click **Add**

   **Variable 2:**
   - Key: `JWT_SECRET`
   - Value: (your generated secret)
   - Environments: ✅ Production ✅ Preview ✅ Development
   - Click **Add**

   **Variable 3:**
   - Key: `NODE_ENV`
   - Value: `production`
   - Environments: ✅ Production ✅ Preview ✅ Development
   - Click **Add**

4. **Click "Deploy"**
5. **Wait 2-3 minutes**
6. **Get your URL**
7. **Add `CLIENT_URL` variable**
8. **Redeploy**

---

## ⚡ Quick Setup:

### MongoDB Atlas Setup:
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. **Database** → **Connect** → **Connect your application**
3. Copy connection string
4. Replace `<password>` with your actual password
5. Replace `<dbname>` with `code2placement`

### Network Access:
1. **Security** → **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere**
4. Enter `0.0.0.0/0`
5. Click **Confirm**

### Generate JWT Secret:
```bash
# Run this in terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Copy the output
```

---

## ✅ Deployment Checklist:

### Before First Deploy:
- [ ] MongoDB URI ready
- [ ] JWT Secret generated
- [ ] MongoDB allows connections from `0.0.0.0/0`
- [ ] Added 3 environment variables in Vercel
- [ ] **NOT** added CLIENT_URL yet

### Click Deploy:
- [ ] Deployment started
- [ ] Wait 2-3 minutes
- [ ] Deployment successful
- [ ] Got Vercel URL

### After First Deploy:
- [ ] Copy Vercel URL
- [ ] Add `CLIENT_URL` environment variable
- [ ] Set value to your Vercel URL
- [ ] Redeploy
- [ ] Test the app

---

## 🎯 Summary:

**First Deployment:**
```
MONGODB_URI ✅
JWT_SECRET ✅
NODE_ENV ✅
CLIENT_URL ❌ (skip)
```

**After Getting URL:**
```
CLIENT_URL ✅ (add now)
Redeploy ✅
```

**Total Time:** ~5 minutes

---

## 🚀 You're Ready!

Just deploy with the 3 required variables, then add CLIENT_URL after!

No need to deploy client separately! 🎉

# 🚀 Deployment Guide - MythicMobs Generator

Panduan lengkap deploy ke Vercel dengan private access.

## 📋 Prerequisites

1. **Claude API Key**
   - Daftar di https://console.anthropic.com
   - Create API key di Settings > API Keys
   - Copy key (format: `sk-ant-api03-...`)
   - **PENTING:** Simpan key ini dengan aman!

2. **Vercel Account**
   - Daftar di https://vercel.com (gratis)
   - Bisa pakai GitHub/GitLab/Bitbucket

3. **Git Repository (Opsional)**
   - Buat repository di GitHub/GitLab
   - Upload project files

## 🎯 Method 1: Deploy via Vercel CLI (Recommended)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

Pilih method login (GitHub/GitLab/Email).

### Step 3: Deploy

```bash
# Di folder project
cd mythicmobs-generator

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - What's your project's name? mythicmobs-generator (atau nama lain)
# - In which directory is your code located? ./ (default)
```

### Step 4: Set Environment Variable

```bash
# Setelah deploy sukses
vercel env add ANTHROPIC_API_KEY

# Pilih environment: Production
# Paste your Claude API key
```

### Step 5: Redeploy dengan Environment Variable

```bash
vercel --prod
```

✅ **Done!** App Anda sekarang live.

## 🎯 Method 2: Deploy via Vercel Dashboard

### Step 1: Upload Project

**Option A: Via Git**
1. Push project ke GitHub/GitLab
2. Buka https://vercel.com/new
3. Import repository
4. Vercel auto-detect settings

**Option B: Direct Upload**
1. Zip folder project
2. Drag & drop ke Vercel dashboard
3. Atau gunakan Vercel CLI: `vercel --prod`

### Step 2: Configure Project

1. **Build Settings:** (auto-detected, no changes needed)
2. **Root Directory:** `./`
3. **Framework Preset:** Other

### Step 3: Add Environment Variables

1. Setelah import, **JANGAN deploy dulu**
2. Go to project **Settings** > **Environment Variables**
3. Add new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Your Claude API key
   - **Environments:** Check "Production"
4. Click **Save**

### Step 4: Deploy

1. Go to **Deployments** tab
2. Click **Deploy** atau push ke Git untuk auto-deploy
3. Wait for build (1-2 minutes)

✅ **Done!** Check deployment URL.

## 🔒 Make it Private

### Option 1: Password Protection (Simple)

1. Go to project **Settings** > **General**
2. Scroll ke **Protection**
3. Enable **Password Protection**
4. Set password (min. 8 characters)
5. **Save**

Sekarang siapa pun yang akses harus input password.

### Option 2: Vercel Authentication (Better)

1. Di **Settings** > **General** > **Protection**
2. Enable **Vercel Authentication**
3. Only logged-in Vercel team members can access

### Option 3: IP Whitelist (Best for specific IPs)

Hanya available di Vercel Pro plan.

## 🔐 Security Best Practices

### 1. Never Commit API Keys

```bash
# Check .gitignore includes:
.env
.env.local
.env.production
*.key
```

### 2. Rotate API Keys Regularly

- Rotate Claude API key setiap 3-6 bulan
- Update di Vercel environment variables

### 3. Monitor Usage

- Check Claude API dashboard untuk usage
- Set spending limits di Anthropic

### 4. Use Environment-Specific Keys

```bash
# Development
vercel env add ANTHROPIC_API_KEY development

# Production (different key)
vercel env add ANTHROPIC_API_KEY production
```

## 📊 Monitor & Debug

### View Logs

```bash
# Real-time logs
vercel logs

# Or in dashboard:
# Project > Deployments > [deployment] > Runtime Logs
```

### Common Issues

**1. "Server configuration error"**
```bash
# Check environment variable
vercel env ls

# Re-add if missing
vercel env add ANTHROPIC_API_KEY production
vercel --prod
```

**2. "Function execution timeout"**
```json
// vercel.json sudah set maxDuration: 60
// Jika masih timeout, komplain Claude API slow
```

**3. "API request failed"**
- Check API key valid
- Check Claude API status
- Check rate limits

## 🔄 Update Deployment

### Method 1: Git Push (if using Git)

```bash
git add .
git commit -m "Update features"
git push

# Auto-deploy to Vercel
```

### Method 2: Manual Deploy

```bash
vercel --prod
```

## 💰 Pricing Info

### Vercel (Hosting)
- **Free Tier:** 100 GB bandwidth, unlimited projects
- **Pro:** $20/month (needed for IP whitelist)

### Claude API (AI)
- **Pay as you go:** ~$3 per 1M input tokens
- **Estimated cost per generation:** $0.02 - $0.10
- **5 credit sudah cukup untuk 50-250 generations**

## 📱 Custom Domain (Optional)

1. Beli domain (Namecheap, Cloudflare, etc.)
2. Di Vercel: Settings > Domains
3. Add your domain
4. Update DNS records:
   ```
   A Record: 76.76.21.21
   CNAME: cname.vercel-dns.com
   ```
5. Wait for DNS propagation (1-48 hours)

## 🎉 Post-Deployment Checklist

- [ ] Environment variables set correctly
- [ ] Password protection enabled
- [ ] Test generation with sample prompt
- [ ] Check logs for errors
- [ ] Save deployment URL securely
- [ ] Monitor API usage
- [ ] Share with team (if applicable)

## 🆘 Need Help?

**Vercel Issues:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**Claude API Issues:**
- Docs: https://docs.anthropic.com
- Support: support@anthropic.com

**Project Issues:**
- Check logs: `vercel logs`
- Check API status
- Validate YAML output

---

**Happy Deploying!** 🎮✨

Jika ada pertanyaan atau issues, create issue di repository atau contact maintainer.
# COOLIFY DEPLOYMENT - TEIF Production Deployment (DETAILED STEP-BY-STEP)

**Complete guide for deploying TEIF to Coolify for the FIRST TIME**

Last Updated: January 2026  
Coolify Version: 4.x (Latest)  
Status: Production-Ready

---

## ⚠️ PRE-DEPLOYMENT: CRITICAL SETUP

Before you touch Coolify, complete these steps:

### Step 1: Verify Your Production Branch

```powershell
# Check current branch
git branch

# Should show: * production

# Verify your current branch
git log --oneline -1
```

Expected output:
```
* production
<your-latest-commit-hash>
```

---

### Step 2: Generate All Required Secrets (DO THIS NOW)

You need to generate these secrets BEFORE deploying. Open PowerShell and run:

#### A. JWT Secret (32 characters, random)
```powershell
# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Maximum 256) }))
```

**Save this value:** `JWT_SECRET = _______________________`

#### B. Database Password (32 characters, random)
```powershell
# Same command as above
[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Maximum 256) }))
```

**Save this value:** `POSTGRES_PASSWORD = _______________________`

#### C. OVH SMTP Credentials

You are using OVH SMTP for email delivery. Your credentials are:

**SMTP Configuration:**
- **SMTP_HOST:** `ssl0.ovh.net`
- **SMTP_PORT:** `587`
- **SMTP_USER:** `support@comptacrm.com`
- **SMTP_PASSWORD:** `Compta2025++`
- **SMTP_SECURE:** `false`

**Note:** These values are already configured in your `.env` file. They will be used for production email delivery.

---

### Step 3: Prepare Your Environment Information

Create a file locally (NOT in Git!) to store your deployment info:

```env
# TEIF Production Deployment Config
# Save as: TEIF_DEPLOYMENT_CREDENTIALS.txt (DO NOT COMMIT)

# Domain Information
PRODUCTION_DOMAIN=yourdomain.com
(Replace with your actual domain)

# Database Credentials
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<paste-your-generated-password-here>
POSTGRES_DB=teif_prod

# JWT Configuration
JWT_SECRET=<paste-your-generated-jwt-secret-here>
JWT_EXPIRY=3600

# Email Configuration (SMTP - OVH)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=support@comptacrm.com
SMTP_PASSWORD=Compta2025++
SMTP_FROM=support@comptacrm.com

# Backend API
DATABASE_URL=postgresql://postgres:<PASSWORD>@postgres:5432/teif_prod
SITE_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com

# Frontend
VITE_API_BASE_URL=https://yourdomain.com/api
NODE_ENV=production
```

**Save this file locally (NOT in Git).** You'll copy values from here into Coolify.

---

### Step 4: DNS Configuration (Do This NOW, NOT after deployment)

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find your VPS IP address (from your hosting provider or Coolify dashboard)
3. Create DNS records:

#### Option A: Use A Record (Simplest)
```
Type:  A
Name:  @
Value: <your-vps-ip-address>
TTL:   3600 (or auto)

Then add www:
Type:  A
Name:  www
Value: <your-vps-ip-address>
TTL:   3600
```

#### Option B: Use CNAME (If your VPS provides a hostname)
```
Type:  CNAME
Name:  @
Value: <your-vps-hostname>
TTL:   3600

Type:  CNAME
Name:  www
Value: yourdomain.com
TTL:   3600
```

**Wait 5-15 minutes for DNS to propagate** (check with: `nslookup yourdomain.com`)

---

## 🚀 COOLIFY DEPLOYMENT (DETAILED WALKTHROUGH)

### Phase 1: Access Coolify Dashboard

#### Step 1: Open Coolify
1. Get your Coolify URL from your hosting provider
2. Typical format: `https://<your-vps-ip>:3000` or `https://coolify.yourdomain.com`
3. Login with your credentials

#### Step 2: Verify Coolify is Ready
In the dashboard, you should see:
- ✅ Server connected (shows your VPS details)
- ✅ Docker installed and running
- ✅ Coolify is operational

If not, contact your hosting provider to ensure Coolify is properly installed.

---

### Phase 2: Create a New Project

#### Step 1: Access Projects
```
Coolify Dashboard
├─ Left Sidebar: Click "Projects" ✓ (Already here)
└─ Top Right: Click "+ Add"
```

#### Step 2: Create Project
```
Project Creation Screen
├─ Project Name: TEIF
│
├─ Description: (Optional)
│  └─ e.g., "TEIF Production Deployment"
│
└─ Click: "Create"
```

**Wait for page to load, then select your server and Git repository...**

---

### Phase 3: Configure Build Settings

After creating the application, you'll see the configuration page:

#### Step 1: Set Build Type to Docker Compose

```
Configuration Settings
├─ Build Pack: Docker Compose
│  (Dropdown menu - SELECT THIS)
│
├─ Compose File Location: docker-compose.prod.yml
│  (This is the file in your repo root)
│
└─ Save
```

#### Step 2: Configure Git Integration

```
Git Configuration
├─ Source: GitHub (or your Git provider)
│
├─ Repository Owner: maksebdevNessrine
│  (Your GitHub username)
│
├─ Repository: TEIF
│  (Your repo name)
│
├─ Branch: production
│  ⚠️ CRITICAL: Select "production" branch (NOT main)
│
├─ Deploy on Push: Toggle ON
│  (Auto-deploy when you push to production branch)
│
└─ Save
```

---

### Phase 4: Domain Configuration

#### Step 1: Add Your Domain

```
Domains & SSL
├─ Click: "+ Add Domain"
│
├─ Domain Name: yourdomain.com
│  (Your actual domain)
│
├─ URL: https://yourdomain.com
│  (Should auto-populate)
│
├─ SSL: Let's Encrypt
│  (Auto-configured)
│
├─ HTTP to HTTPS Redirect: Enable (toggle ON)
│
└─ Save
```

**Wait for SSL certificate to be generated** (1-5 minutes)

---

### Phase 5: Add Environment Variables (CRITICAL!)

This is the MOST IMPORTANT step. Copy values from your saved credentials file.

#### Step 1: Access Environment Variables

```
In Application Settings
├─ Find: "Environment Variables"
├─ Click: "Add Variable"
└─ You'll add each variable here one by one
```

#### Step 2: Add Database Variables

**Variable 1:**
```
Key:   POSTGRES_USER
Value: postgres
Visibility: Private
Save
```

**Variable 2:**
```
Key:   POSTGRES_PASSWORD
Value: <PASTE-YOUR-GENERATED-32-CHAR-PASSWORD>
Visibility: Private
Save
```

**Variable 3:**
```
Key:   POSTGRES_DB
Value: teif_prod
Visibility: Private
Save
```

#### Step 3: Add Backend Variables

**Variable 4:**
```
Key:   DATABASE_URL
Value: postgresql://postgres:<YOUR-POSTGRES-PASSWORD>@postgres:5432/teif_prod
       (Replace <YOUR-POSTGRES-PASSWORD> with the actual password)
Visibility: Private
Save
```

⚠️ **IMPORTANT:** Make sure you replace `<YOUR-POSTGRES-PASSWORD>` with the actual password you generated!

**Variable 5:**
```
Key:   JWT_SECRET
Value: <PASTE-YOUR-GENERATED-32-CHAR-SECRET>
Visibility: Private
Save
```

**Variable 6:**
```
Key:   JWT_EXPIRY
Value: 3600
Visibility: Private
Save
```

**Variable 7:**
```
Key:   SITE_URL
Value: https://yourdomain.com
Visibility: Private
Save
```

**Variable 8:**
```
Key:   CORS_ORIGIN
Value: https://yourdomain.com
Visibility: Private
Save
```

**Variable 9:**
```
Key:   SMTP_HOST
Value: smtp.gmail.com
       (or your provider's SMTP host)
Visibility: Private
Save
```

**Variable 10:**
```
Key:   SMTP_PORT
Value: 587
Visibility: Private
Save
```

**Variable 11:**
```
Key:   SMTP_USER
Value: your-email@gmail.com
       (Your actual email)
Visibility: Private
Save
```

**Variable 12:**
```
Key:   SMTP_PASSWORD
Value: <PASTE-YOUR-GMAIL-APP-PASSWORD>
       (The 16-character password from Gmail)
Visibility: Private
Save
```

**Variable 13:**
```
Key:   SMTP_FROM
Value: noreply@yourdomain.com
Visibility: Private
Save
```

**Variable 14:**
```
Key:   VITE_API_BASE_URL
Value: https://yourdomain.com/api
Visibility: Private
Save
```

**Variable 15:**
```
Key:   NODE_ENV
Value: production
Visibility: Private
Save
```

---

### Phase 6: Deploy Your Application

#### Step 1: Review Settings

Before deploying, verify:
- ✅ Application Name: TEIF
- ✅ Build Pack: Docker Compose
- ✅ Compose File: docker-compose.prod.yml
- ✅ Branch: production
- ✅ Domain: yourdomain.com (with ✅ SSL certificate)
- ✅ All 15 environment variables are set
- ✅ No error messages

#### Step 2: Start Deployment

```
Coolify Dashboard
├─ Application: TEIF
├─ Top Right: Click "Deploy"
│  (or "Redeploy" if showing)
│
└─ You should see:
   - "Deployment started..."
   - Build progress indicator
   - Service startup logs
```

#### Step 3: Monitor Deployment Progress

```
You'll see real-time logs showing:

1. Building backend image:
   ✓ Pulling node:20-alpine
   ✓ Copying application files
   ✓ Installing dependencies (pnpm)
   ✓ Building application
   ✓ Running Prisma generate
   ✓ Creating final image

2. Building frontend image:
   ✓ Pulling node:20-alpine builder
   ✓ Building React application with Vite
   ✓ Running Nginx stage
   ✓ Creating final image

3. Starting services:
   ✓ PostgreSQL starting...
   ✓ Backend starting...
   ✓ Frontend starting...
   ✓ Health checks running...
   ✓ All services healthy ✅
```

**This usually takes 5-15 minutes for first deployment.**

---

### Phase 7: Verify Deployment Success

#### Step 1: Check Service Status

```
In Coolify Dashboard
├─ Application: TEIF
├─ Services section shows:
│  ├─ teif-postgres: 🟢 Running
│  ├─ teif-backend: 🟢 Running
│  └─ teif-frontend: 🟢 Running
│
├─ All should show 🟢 Green
└─ No 🔴 Red status indicators
```

#### Step 2: Test Backend Health Endpoint

Open a terminal and test:

```powershell
# Test health endpoint
curl https://yourdomain.com/api/health

# Or in browser, go to:
https://yourdomain.com/api/health

# Expected response:
{
  "status": "ok",
  "timestamp": "2026-01-17T...",
  "environment": "production"
}
```

If you get an error, wait 30 seconds and try again. The service might still be starting.

#### Step 3: Test Frontend

```
Open in browser:
https://yourdomain.com

You should see:
✓ TEIF React application loads
✓ Login page appears
✓ No blank page
✓ No 404 errors
✓ No "Connection refused" messages
```

#### Step 4: Test Authentication

1. Click "Sign Up"
2. Enter credentials:
   - Email: `test@yourdomain.com`
   - Password: `TestPassword123!`
   - Name: `Test User`
3. Click "Register"
4. You should see: "Check your email for verification"
5. **Check your email inbox** for verification message
6. Click verification link
7. Should be able to login

---

### Phase 8: Check Logs for Any Issues

#### Step 1: View Logs

```
In Coolify Dashboard
├─ Application: TEIF
├─ Click: "Logs"
├─ View logs from past 1 hour
│
└─ Look for errors:
   ❌ "Connection refused"
   ❌ "Port already in use"
   ❌ "Database migration failed"
   ❌ "Build failed"
```

#### Step 2: If You See Errors

**Error: "Cannot connect to database"**
- Check if `DATABASE_URL` variable is correct
- Verify `POSTGRES_PASSWORD` matches exactly
- Restart PostgreSQL service in Coolify

**Error: "Build failed" or "npm install failed"**
- Check if `docker-compose.prod.yml` path is correct
- Verify branch is set to `production`
- Try redeploying

**Error: "Frontend shows blank page"**
- Check `VITE_API_BASE_URL` is correct
- Check browser console (F12 → Console tab) for CORS errors
- Verify backend is responding to requests

---

## 📋 PRODUCTION DEPLOYMENT CHECKLIST

### Before Deployment
- [ ] Production branch created and pushed
- [ ] All secrets generated (JWT, DB password, etc.)
- [ ] DNS configured and propagating
- [ ] Environment credentials saved locally (NOT in Git)
- [ ] SMTP credentials verified (especially if using Gmail app password)

### During Deployment (In Coolify)
- [ ] Project created with name "TEIF"
- [ ] Build Pack: Docker Compose selected
- [ ] Compose File: docker-compose.prod.yml
- [ ] Branch: production (NOT main or master)
- [ ] Domain: yourdomain.com configured
- [ ] SSL: Let's Encrypt certificate issued
- [ ] All 15 environment variables added
- [ ] Deploy button clicked

### After Deployment
- [ ] All 3 services show 🟢 Green
- [ ] Health endpoint responds: `/api/health`
- [ ] Frontend loads: `https://yourdomain.com`
- [ ] Can signup and receive verification email
- [ ] Can login with verified account
- [ ] No errors in Coolify logs

---

## 🆘 TROUBLESHOOTING - COMMON ISSUES

### Issue: Deployment stuck on "Building..."

**Solution:**
1. Wait 15+ minutes (first build takes time)
2. If still stuck after 20 minutes:
   - Click "Cancel Deployment"
   - Check logs for errors
   - Fix any issues found
   - Click "Deploy" again

---

### Issue: "Service failed to start"

**Check:**
1. Go to Logs tab
2. Look for "error" or "failed" messages
3. Most common: Incorrect environment variables

**If DATABASE_URL error:**
```
Current: postgresql://postgres:wrongpassword@postgres:5432/teif_prod
Should be: postgresql://postgres:YOURPASSWORD@postgres:5432/teif_prod
         (with YOUR actual POSTGRES_PASSWORD)

Fix: Edit environment variable, correct password, redeploy
```

---

### Issue: "Frontend shows blank page"

**Check:**
1. Open browser Developer Tools (F12)
2. Click "Console" tab
3. Look for error messages
4. Most common: `CORS error` or `Cannot reach API`

**If CORS error:**
```
Check CORS_ORIGIN variable:
Current: https://yourdomain.com
Correct: https://yourdomain.com  (must match exactly)

Not correct: http://yourdomain.com (missing https)
Not correct: yourdomain.com (missing https://)
Not correct: www.yourdomain.com (unless this is your domain)

Fix: Edit CORS_ORIGIN, save, redeploy
```

---

### Issue: "Email not sending"

**Check:**
1. Go to Coolify Logs
2. Look for SMTP error messages
3. Most common: Incorrect SMTP credentials

**If using Gmail:**
```
❌ Wrong: Your regular Gmail password
✅ Correct: App password from myaccount.google.com/apppasswords
          (16-character password)

✅ Correct SMTP settings:
   SMTP_HOST: smtp.gmail.com
   SMTP_PORT: 587
   SMTP_USER: your-email@gmail.com
   SMTP_PASSWORD: <16-char app password>

Fix: Update SMTP_PASSWORD, save, restart backend service
```

---

### Issue: "Cannot reach VPS / Connection timeout"

**Check:**
1. Is your VPS IP correct?
2. Is DNS pointing to correct IP?
3. Is firewall blocking ports 80/443?

**Solution:**
1. Get correct VPS IP from your hosting provider
2. Verify DNS: `nslookup yourdomain.com`
3. Ask hosting provider if ports 80/443 are open

---

### Issue: "SSL certificate not issued"

**Solution:**
1. Verify DNS is pointing to VPS IP
2. Wait 5-15 minutes for DNS propagation
3. Check: `nslookup yourdomain.com` returns VPS IP
4. Click "Renew Certificate" in Coolify SSL settings
5. If still fails, check logs for ACME errors

---

## 🔄 FUTURE DEPLOYMENTS (After First Deploy)

### To deploy new code:

#### Option 1: Auto-deployment (Simplest)
```
1. Make changes locally
2. Commit: git commit -m "Your message"
3. Push:  git push origin production
4. Coolify automatically deploys within 1-2 minutes
```

#### Option 2: Manual deployment
```
1. Push to production branch
2. In Coolify: Applications → TEIF → Click "Deploy"
3. New deployment starts
```

---

## 📊 MONITORING AFTER DEPLOYMENT

### Daily Checks

**Check service status:**
```
Coolify Dashboard
├─ Applications → TEIF
└─ Verify all services 🟢 Green
```

**Check logs for errors:**
```
Coolify Dashboard
├─ Applications → TEIF
├─ Logs tab
└─ Look for ERROR or WARNING messages
```

**Test key functionality:**
```
1. Health check: curl https://yourdomain.com/api/health
2. Frontend: Visit https://yourdomain.com
3. Authentication: Try login/logout
4. Email: Verify email sending works
```

---

## 🎯 NEXT STEPS AFTER SUCCESSFUL DEPLOYMENT

1. **Verify backups are working:**
   ```
   SSH to VPS
   ./backup-and-monitor.sh
   Verify backup file created in volumes/backups/
   ```

2. **Set up daily backups in cron:**
   ```
   crontab -e
   Add: 0 2 * * * /path/to/backup-and-monitor.sh
   ```

3. **Test backup restoration:**
   ```
   ./restore-backup.sh ./volumes/backups/latest.sql.gz
   Confirm data restored correctly
   ```

4. **Monitor performance:**
   ```
   Track API response times
   Monitor database query performance
   Watch server resource usage
   ```

---

## 📝 NOTES & TIPS

### Important Points

1. **Never modify environment variables on a live system** without understanding the impact
2. **Always test changes** in a staging environment first
3. **Keep your secrets secure** - never share credentials in messages
4. **Backup before major changes** - use backup-and-monitor.sh
5. **Monitor logs regularly** - catch issues early

### Common Mistakes to Avoid

❌ Using `main` branch instead of `production` branch  
❌ Forgetting to replace placeholder values in DATABASE_URL  
❌ Using regular Gmail password instead of app password  
❌ Not waiting for DNS propagation (wait 5-15 minutes)  
❌ Mixing HTTP and HTTPS in CORS_ORIGIN  
❌ Committing `.env` files or credentials to Git  
❌ Not testing deployment before going fully live  

---

## ✅ SUCCESS INDICATORS

Your deployment is successful when:

✅ All services show 🟢 Green in Coolify  
✅ Health endpoint returns 200 OK  
✅ Frontend loads without errors  
✅ Can signup and receive verification email  
✅ Can login with verified email  
✅ No error messages in Coolify logs  
✅ Backend responds to API requests  
✅ Database is connected and working  

---

## 🎉 DEPLOYMENT COMPLETE!

Your TEIF application is now live on Coolify! 

**Your live URL:** https://yourdomain.com

**Next:** Monitor logs, test functionality, set up backups.

---

**Deployment Guide Version:** 2.0  
**Last Updated:** January 2026  
**Status:** Production-Ready

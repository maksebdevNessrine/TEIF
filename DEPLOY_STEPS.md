# TEIF VPS - Deployment Step-by-Step

## Step 1: SSH into VPS
```bash
ssh ubuntu@your-vps-ip
# Or for duckdns with password:
ssh ubuntu@vps-9b03067a.duckdns.org
```

## Step 2: Clean up and run fresh deployment
```bash
cd /tmp
rm -rf teif
git clone https://github.com/maksebdevNessrine/teif.git --branch production
bash teif/FASTEST_DEPLOY.sh efatoura.duckdns.org https://github.com/maksebdevNessrine/teif.git
```

## Step 3: When script asks for SSL setup
When you see:
```
Press Enter to continue with SSL setup...
```

Make sure your domain DNS is pointing to the VPS, then press Enter.

## Step 4: Verify deployment succeeded
```bash
# Check backend is running
curl http://localhost:3000/health

# Check logs
pm2 logs teif-backend

# Check all services
pm2 status
docker ps
```

## Step 5: Configure email (optional)
```bash
nano /var/www/teif/packages/backend/.env
# Add: SENDGRID_API_KEY=your-key-here
pm2 restart teif-backend
```

## Done!

Your app should be live at:
- **Backend**: http://localhost:3000
- **Frontend**: Will be available at https://efatoura.duckdns.org after DNS setup

---

## Redeploy after code changes:
```bash
# On local machine:
git push origin production

# On VPS:
bash /var/www/teif/redeploy.sh
```

## Troubleshooting
```bash
# View full backend logs
pm2 logs teif-backend --lines 100

# Check if shared dist exists
ls -la /var/www/teif/packages/shared/dist/

# Check PostgreSQL
docker compose -f /var/www/teif/docker-compose.production.yml ps

# View nginx config
sudo cat /etc/nginx/sites-available/teif
```

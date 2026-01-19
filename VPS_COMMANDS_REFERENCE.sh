#!/bin/bash
#
# TEIF Ubuntu VPS - Quick Commands Reference
# Run these on your VPS one at a time
#

# ========== INITIAL SETUP (Run once) ==========

# 1. SSH into VPS
# ssh ubuntu@your-vps-ip

# 2. Navigate and run deployment
cd /tmp
git clone https://github.com/maksebdevNessrine/teif.git --branch production
bash teif/FASTEST_DEPLOY.sh efatoura.duckdns.org https://github.com/maksebdevNessrine/teif.git

# This will take 5-7 minutes and set up everything

# ========== DURING DEPLOYMENT ==========

# When prompted "Press Enter to continue with SSL setup..."
# Make sure your domain DNS is pointing to the VPS IP, then press Enter

# ========== AFTER DEPLOYMENT ==========

# Test backend health
curl http://localhost:3000/health

# View backend logs
pm2 logs teif-backend

# Check all PM2 processes
pm2 status

# View PostgreSQL status
docker compose -f /var/www/teif/docker-compose.production.yml ps

# ========== REDEPLOY AFTER CODE CHANGES ==========

# 1. On your local machine, push to production:
# git push origin production

# 2. On VPS, run redeploy script:
bash /var/www/teif/redeploy.sh

# ========== COMMON TROUBLESHOOTING ==========

# Backend won't start?
pm2 logs teif-backend --lines 50

# Check if port 3000 is in use
sudo lsof -i :3000

# PostgreSQL not responding?
docker compose -f /var/www/teif/docker-compose.production.yml logs postgres

# Restart PostgreSQL
docker compose -f /var/www/teif/docker-compose.production.yml restart postgres

# Nginx configuration issues?
sudo nginx -t
sudo systemctl restart nginx

# ========== ADMIN COMMANDS ==========

# Restart backend
pm2 restart teif-backend

# Stop backend
pm2 stop teif-backend

# Kill and restart from ecosystem
pm2 delete teif-backend
pm2 start /var/www/teif/ecosystem.config.js

# View disk usage
df -h

# View system resources
free -h
htop

# Check security: SSL cert status
sudo certbot certificates

# Backup database
docker exec teif-postgres pg_dump -U teif_user teif > /tmp/teif-backup.sql

# ========== MONITORING ==========

# Live app monitoring
pm2 monit

# Container stats
docker stats teif-postgres

# System monitoring
watch -n 1 'free -h; echo "---"; df -h'

# ========== USEFUL PATHS ==========

# App directory
/var/www/teif

# Backend .env (secrets)
/var/www/teif/packages/backend/.env

# Frontend dist
/var/www/teif/packages/frontend/dist

# PostgreSQL data
/var/www/teif-data/postgres

# App logs
/var/log/teif/

# Nginx config
/etc/nginx/sites-available/teif

# SSL certs
/etc/letsencrypt/live/efatoura.duckdns.org

# ========== SSH KEY SETUP (Optional) ==========

# Generate SSH key on local machine (if not done)
# ssh-keygen -t ed25519 -C "your-email"

# Copy to VPS
# ssh-copy-id ubuntu@your-vps-ip

# Now you can SSH without password:
# ssh ubuntu@your-vps-ip

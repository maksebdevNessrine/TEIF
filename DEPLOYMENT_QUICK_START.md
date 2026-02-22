# TEIF - Ubuntu 24.04 VPS Deployment - Quick Start

## One-Shot Deploy Command

Run this on your Ubuntu 24.04 VPS:

```bash
cd /tmp
git clone https://github.com/maksebdevNessrine/teif.git --branch production
bash teif/FASTEST_DEPLOY.sh efatoura.duckdns.org https://github.com/maksebdevNessrine/teif.git
```

## What the script does (5-7 minutes):

1. ✅ Updates system & installs Docker, Node.js 20, nginx, certbot
2. ✅ Creates app directories with proper permissions
3. ✅ Clones your repo from production branch
4. ✅ Auto-generates secure `.env` files
5. ✅ Starts PostgreSQL container
6. ✅ Runs `pnpm install && pnpm build`
7. ✅ Runs Prisma migrations
8. ✅ Starts backend with PM2 (clustering)
9. ✅ Configures Nginx reverse proxy
10. ✅ Sets up SSL/TLS certificate
11. ✅ Verifies everything is working

---

## During Deployment

When prompted:
```
Press Enter to continue with SSL setup...
```

This is when it needs your domain DNS to point to the VPS IP. Press Enter to proceed.

---

## After Deployment

### ✅ Access your app:
```bash
# Backend health check:
curl http://localhost:3000/health

# Frontend (after SSL is ready):
# Visit: https://efatoura.duckdns.org
```

### 📋 Check logs:
```bash
# Backend logs
pm2 logs teif-backend

# PostgreSQL logs
docker compose -f /var/www/teif/docker-compose.production.yml logs -f postgres

# Nginx access/errors
sudo tail -f /var/log/nginx/teif-error.log
sudo tail -f /var/log/nginx/teif-access.log
```

### 🔄 Redeploy after code changes:
```bash
# Push code to production branch locally:
git push origin production

# On VPS, run:
bash /var/www/teif/redeploy.sh
```

---

## Troubleshooting

### Backend won't start:
```bash
pm2 logs teif-backend
# Check for errors in output
```

### Port already in use:
```bash
# Port 3000
sudo lsof -i :3000

# Port 80/443
sudo lsof -i :80
sudo lsof -i :443
```

### Database connection failed:
```bash
# Check PostgreSQL is running
docker compose -f /var/www/teif/docker-compose.production.yml ps

# Check logs
docker compose -f /var/www/teif/docker-compose.production.yml logs postgres
```

### SSL certificate stuck:
```bash
# Check cert exists
sudo ls -la /etc/letsencrypt/live/efatoura.duckdns.org/

# Manual renewal
sudo certbot renew --force-renewal
```

---

## Configuration

### Secrets are auto-generated in:
- `/var/www/teif/packages/backend/.env` ← contains DB password, JWT secrets

### Email Setup:
Get a SendGrid API key and add to `.env`:
```bash
sudo nano /var/www/teif/packages/backend/.env
# Add: SENDGRID_API_KEY=your_key_here
# Then restart: pm2 restart teif-backend
```

### Database backups:
```bash
# Backup PostgreSQL
docker exec teif-postgres pg_dump -U teif_user teif > /var/www/teif-backup-$(date +%Y%m%d).sql

# Restore
docker exec -i teif-postgres psql -U teif_user teif < backup.sql
```

---

## Systemd Commands (if using systemd instead of PM2)

```bash
# Check status
sudo systemctl status teif-backend

# Restart
sudo systemctl restart teif-backend

# Stop
sudo systemctl stop teif-backend

# View logs
sudo journalctl -u teif-backend -f
```

---

## Key Files

| Location | Purpose |
|----------|---------|
| `/var/www/teif` | App root directory |
| `/var/www/teif/packages/backend/.env` | Backend secrets |
| `/var/www/teif/packages/frontend/.env.production` | Frontend API URL |
| `/var/www/teif/ecosystem.config.js` | PM2 configuration |
| `/var/www/teif/docker-compose.production.yml` | PostgreSQL config |
| `/var/www/teif/redeploy.sh` | Quick redeploy script |
| `/var/www/teif-data/postgres` | PostgreSQL data volume |
| `/var/log/teif/` | Application logs |
| `/etc/nginx/sites-available/teif` | Nginx config |
| `/etc/letsencrypt/live/efatoura.duckdns.org/` | SSL certificates |

---

## Performance Monitoring

```bash
# Monitor server resources
htop

# Check app memory usage
pm2 monit

# Check Docker container stats
docker stats teif-postgres

# Check Nginx connection count
sudo ss -tulpn | grep nginx
```

---

## Maintenance

### Weekly: Check logs
```bash
sudo tail -f /var/log/nginx/teif-error.log
pm2 logs teif-backend --lines 100
```

### Monthly: Update dependencies
```bash
cd /var/www/teif
git pull origin production
bash redeploy.sh
```

### Monthly: Check SSL renewal
```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

---

## Emergency Commands

```bash
# Kill and restart backend
pm2 delete teif-backend
pm2 start ecosystem.config.js

# Hard restart Docker PostgreSQL
docker compose -f /var/www/teif/docker-compose.production.yml restart postgres

# Clear PM2 logs
pm2 flush

# View system resource usage
free -h
df -h
```

---

**Questions?** Check logs first, then reach out with error messages.

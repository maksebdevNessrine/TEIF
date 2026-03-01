# 🚀 TEIF Deployment Checklist

## Pre-Deployment

- [ ] GitHub repository is public or access is granted to CI/CD
- [ ] Docker Hub account created
- [ ] Docker Hub personal access token generated
- [ ] GitHub Secrets configured:
  - [ ] `DOCKER_HUB_USERNAME`
  - [ ] `DOCKER_HUB_PASSWORD`
- [ ] SSH key configured for VPS access
- [ ] Domain name ready (optional but recommended)
- [ ] SSL certificate ready (optional but recommended)

## Local Development Verification

- [ ] Backend starts with `pnpm dev`
- [ ] Database connects successfully
- [ ] API health check: `GET /api/health` returns 200
- [ ] Frontend can communicate with backend
- [ ] Docker image builds successfully: `docker build -t teif:latest .`
- [ ] Docker image runs locally: `docker run -p 3000:3000 teif:latest`

## GitHub Actions Setup

- [ ] `.github/workflows/docker-build-push.yml` exists
- [ ] Workflow file has correct Docker Hub username
- [ ] Workflow triggers on `push` to `main` and `production` branches
- [ ] Test workflow:
  1. Make a small change to code
  2. Push to `production` branch
  3. Check GitHub Actions tab for successful build & push
  4. Verify image appears on Docker Hub

## VPS Deployment

### Fresh VPS Setup

- [ ] VPS running Ubuntu 22.04 LTS or later
- [ ] SSH access confirmed: `ssh root@your-vps-ip`
- [ ] Enough disk space (20GB+): `df -h`
- [ ] Enough RAM (2GB+): `free -h`
- [ ] Internet connectivity: `ping 8.8.8.8`

### Run Deployment Script

- [ ] Downloaded/ran deploy script:
  ```bash
  curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/TEIF/main/deploy.sh | bash
  ```
- [ ] Script completed without errors
- [ ] Services are running: `docker-compose ps`
- [ ] PostgreSQL is healthy: `docker-compose logs postgres | grep "ready"`
- [ ] Backend started: `docker-compose logs backend | grep "Server running"`

### Configuration

- [ ] `.env` file created in `/opt/teif/`
- [ ] All secrets filled in (no placeholder values):
  - [ ] `POSTGRES_PASSWORD`
  - [ ] `JWT_SECRET`
  - [ ] `JWT_REFRESH_SECRET`
  - [ ] `SIGNATURE_ENCRYPTION_KEY`
  - [ ] `FRONTEND_URL` (set to your domain)
- [ ] `.env` is NOT in git: `.env` in `.gitignore`

### Health Checks

- [ ] Health endpoint responds:
  ```bash
  curl http://your-vps-ip:3000/api/health
  ```
- [ ] PostgreSQL is accepting connections:
  ```bash
  docker-compose exec postgres pg_isready -U postgres
  ```
- [ ] No error logs: `docker-compose logs backend | grep -i error`
- [ ] All containers running: `docker ps`

## Security

- [ ] Firewall enabled and configured:
  ```bash
  sudo ufw allow 22/tcp
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo ufw enable
  ```
- [ ] SSH key-based auth only (password login disabled if possible)
- [ ] Strong passwords generated (32+ characters):
  - [ ] `POSTGRES_PASSWORD`
  - [ ] `JWT_SECRET`
  - [ ] `JWT_REFRESH_SECRET`
- [ ] Database backups enabled and tested
- [ ] SSL/HTTPS configured (recommended):
  - [ ] Certificate installed
  - [ ] HTTP → HTTPS redirect configured
  - [ ] Nginx/Caddy configured

## Monitoring

- [ ] Backup script running:
  ```bash
  ls -la /opt/teif/backups/
  ```
- [ ] Cron job configured: `crontab -l | grep backup`
- [ ] Log rotation configured: `cat /etc/logrotate.d/teif`
- [ ] System monitoring setup (optional):
  - [ ] Uptime monitoring (UptimeRobot, etc.)
  - [ ] Error tracking (Sentry, etc.)
  - [ ] Performance monitoring (NewRelic, etc.)

## Continuous Deployment

- [ ] Webhook configured on Docker Hub (optional):
  - Platform: Docker Hub > Your Repo > Webhooks
  - URL: Your VPS endpoint or automation service
- [ ] Alternative: Manual deployment process documented
- [ ] Test deployment:
  1. Push change to `production` branch
  2. Wait for GitHub Actions to complete
  3. Pull on VPS or webhook triggers automatically
  4. Verify new version deployed: `docker-compose ps`

## Post-Deployment

- [ ] Send monitoring alerts to team
- [ ] Document access credentials (securely):
  - [ ] VPS IP address
  - [ ] SSH username
  - [ ] Database credentials location
- [ ] Setup team communication channel for alerts
- [ ] Document rollback procedure
- [ ] Create runbook for common operations:
  - [ ] Viewing logs
  - [ ] Restarting services
  - [ ] Restoring database
  - [ ] Deploying updates

## Regular Maintenance

- [ ] Daily: Check health endpoints
- [ ] Weekly: Review logs for errors
- [ ] Weekly: Verify backups exist and are current
- [ ] Monthly: Review security updates
- [ ] Monthly: Check disk usage and cleanup
- [ ] Quarterly: Full backup restore test
- [ ] Quarterly: Security audit

## Troubleshooting

If anything fails, check in this order:

1. **Check service status:**
   ```bash
   docker-compose ps
   docker-compose logs
   ```

2. **Check resource usage:**
   ```bash
   docker stats
   df -h
   free -h
   ```

3. **Check logs:**
   ```bash
   docker-compose logs -f backend
   docker-compose logs -f postgres
   ```

4. **Verify connectivity:**
   ```bash
   curl http://localhost:3000/api/health
   docker-compose exec postgres pg_isready -U postgres
   ```

5. **Common fixes:**
   - Restart services: `docker-compose restart`
   - Update image: `docker pull maksebdev3/teif:latest && docker-compose up -d`
   - Check disk space: Delete old backups/logs if needed

---

## Quick Reference

**Production Branch:** `production`  
**Docker Hub Image:** `maksebdev3/teif:latest`  
**VPS Directory:** `/opt/teif`  
**Logs:** `/opt/teif/logs/`  
**Backups:** `/opt/teif/backups/`  
**Config:** `/opt/teif/.env`  

### One-Line Commands

```bash
# Check everything
docker-compose ps && docker stats

# View all logs
docker-compose logs -f

# Restart services
docker-compose restart

# Update image
docker pull maksebdev3/teif:latest && docker-compose up -d

# Backup database
/opt/teif/backup.sh

# SSH to backend
docker-compose exec backend sh

# SSH to database
docker-compose exec postgres psql -U postgres
```

---

✅ **When all checkboxes are complete, your deployment is ready for production use!**

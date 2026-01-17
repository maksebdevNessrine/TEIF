#!/bin/bash
# TEIF Automated Backup & Maintenance Script
# Run this via cron: 0 2 * * * /path/to/backup-and-monitor.sh
# Or in Coolify: Add as a scheduled task

set -e

# Configuration
BACKUP_DIR="./volumes/backups"
POSTGRES_CONTAINER="teif-postgres"
POSTGRES_DB="${POSTGRES_DB:-teif_prod}"
POSTGRES_USER="${POSTGRES_USER:-postgres}"
BACKUP_RETENTION_DAYS=30
SLACK_WEBHOOK="${SLACK_WEBHOOK:-}" # Optional: Slack notifications
LOG_FILE="./logs/backup-$(date +%Y-%m-%d).log"

# Create directories if they don't exist
mkdir -p "$BACKUP_DIR" ./logs

# Logging function
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

# Slack notification (optional)
notify_slack() {
  if [ -n "$SLACK_WEBHOOK" ]; then
    curl -X POST "$SLACK_WEBHOOK" \
      -H 'Content-Type: application/json' \
      -d "{\"text\": \"$1\"}" 2>/dev/null || true
  fi
}

# ============================================
# 1. BACKUP DATABASE
# ============================================

log "🔄 Starting database backup..."

BACKUP_FILE="$BACKUP_DIR/teif-backup-$(date +%Y-%m-%d-%H%M%S).sql.gz"

# Perform backup via Docker
docker compose exec -T postgres pg_dump \
  -U "$POSTGRES_USER" \
  "$POSTGRES_DB" | \
  gzip > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
  log "✅ Backup successful: $BACKUP_FILE ($SIZE)"
  notify_slack "✅ TEIF Database Backup Success - $SIZE"
else
  log "❌ Backup failed!"
  notify_slack "❌ TEIF Database Backup Failed!"
  exit 1
fi

# ============================================
# 2. CLEANUP OLD BACKUPS
# ============================================

log "🧹 Cleaning up old backups (older than $BACKUP_RETENTION_DAYS days)..."

PURGE_OLDER_THAN=$(date -d "$BACKUP_RETENTION_DAYS days ago" +%s)
DELETED_COUNT=0

for backup_file in "$BACKUP_DIR"/*.sql.gz; do
  [ -f "$backup_file" ] || continue
  
  file_time=$(stat -c %Y "$backup_file" 2>/dev/null || stat -f %m "$backup_file" 2>/dev/null)
  
  if [ "$file_time" -lt "$PURGE_OLDER_THAN" ]; then
    rm -f "$backup_file"
    log "  Deleted: $(basename "$backup_file")"
    ((DELETED_COUNT++))
  fi
done

log "✅ Cleanup complete. Deleted $DELETED_COUNT old backups."

# ============================================
# 3. HEALTH CHECK
# ============================================

log "💚 Running service health checks..."

# Check PostgreSQL
if docker compose exec -T postgres pg_isready -U "$POSTGRES_USER" &>/dev/null; then
  log "  ✅ PostgreSQL: Healthy"
else
  log "  ❌ PostgreSQL: Unhealthy"
  notify_slack "⚠️ TEIF PostgreSQL service is unhealthy!"
fi

# Check Backend
if curl -s http://localhost:3000/api/health | grep -q "ok"; then
  log "  ✅ Backend API: Healthy"
else
  log "  ⚠️ Backend API: Unhealthy or unreachable"
  notify_slack "⚠️ TEIF Backend API is unhealthy!"
fi

# Check Frontend
if curl -s http://localhost/ | grep -q "html\|<!DOCTYPE"; then
  log "  ✅ Frontend: Healthy"
else
  log "  ⚠️ Frontend: Unhealthy or unreachable"
  notify_slack "⚠️ TEIF Frontend is unhealthy!"
fi

# ============================================
# 4. DISK SPACE MONITORING
# ============================================

log "💾 Checking disk space..."

DISK_USAGE=$(df . | awk 'NR==2 {print $5}' | sed 's/%//')

if [ "$DISK_USAGE" -gt 90 ]; then
  log "⚠️ CRITICAL: Disk usage at ${DISK_USAGE}%"
  notify_slack "🚨 CRITICAL: TEIF disk usage at ${DISK_USAGE}%!"
elif [ "$DISK_USAGE" -gt 80 ]; then
  log "⚠️ WARNING: Disk usage at ${DISK_USAGE}%"
  notify_slack "⚠️ WARNING: TEIF disk usage at ${DISK_USAGE}%"
else
  log "✅ Disk usage: ${DISK_USAGE}%"
fi

# ============================================
# 5. DATABASE MAINTENANCE
# ============================================

log "🔧 Running database maintenance..."

# Vacuum database (cleanup dead rows)
docker compose exec -T postgres psql \
  -U "$POSTGRES_USER" \
  -d "$POSTGRES_DB" \
  -c "VACUUM ANALYZE;" &>/dev/null

log "✅ Database maintenance complete"

# ============================================
# 6. CREATE LATEST SYMLINK
# ============================================

LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/*.sql.gz 2>/dev/null | head -1)
if [ -n "$LATEST_BACKUP" ]; then
  ln -sf "$LATEST_BACKUP" "$BACKUP_DIR/latest.sql.gz"
  log "✅ Latest backup symlink updated"
fi

# ============================================
# 7. SUMMARY
# ============================================

log "=========================================="
log "✅ Backup & Monitoring Complete!"
log "=========================================="
log "Backups location: $BACKUP_DIR"
log "Backup retention: $BACKUP_RETENTION_DAYS days"
log "Log file: $LOG_FILE"

notify_slack "✅ TEIF Backup & Monitoring cycle completed successfully"

#!/bin/bash
# TEIF Restore Database from Backup
# Usage: ./restore-backup.sh [backup_file]
# Example: ./restore-backup.sh ./volumes/backups/teif-backup-2026-01-17-120000.sql.gz

set -e

BACKUP_FILE="${1:-.}"
POSTGRES_CONTAINER="teif-postgres"
POSTGRES_DB="${POSTGRES_DB:-teif_prod}"
POSTGRES_USER="${POSTGRES_USER:-postgres}"

# Ensure backup file is provided
if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Backup file not found: $BACKUP_FILE"
  echo ""
  echo "Available backups:"
  ls -lh ./volumes/backups/*.sql.gz 2>/dev/null | awk '{print "  " $NF}'
  exit 1
fi

echo "⚠️  WARNING: This will restore the database from: $BACKUP_FILE"
echo "⚠️  All current data will be replaced!"
echo ""
read -p "Type 'yes' to confirm: " confirm

if [ "$confirm" != "yes" ]; then
  echo "❌ Restore cancelled"
  exit 1
fi

echo "🔄 Starting database restore..."

# Decompress and restore
if [[ "$BACKUP_FILE" == *.gz ]]; then
  gunzip -c "$BACKUP_FILE" | docker compose exec -T postgres psql \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB"
else
  cat "$BACKUP_FILE" | docker compose exec -T postgres psql \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB"
fi

if [ $? -eq 0 ]; then
  echo "✅ Database restore successful!"
  echo "💾 Restored from: $BACKUP_FILE"
else
  echo "❌ Database restore failed!"
  exit 1
fi

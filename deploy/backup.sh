#!/usr/bin/env bash
# Nightly database dump (kept 7 days). Install the cron job once:
#   ( crontab -l 2>/dev/null; echo "0 3 * * * /opt/gallerycando/backup.sh >> /opt/gallerycando/backups/backup.log 2>&1" ) | crontab -
set -euo pipefail
DIR=/opt/gallerycando/backups
mkdir -p "$DIR"
FILE="$DIR/gallerycando-$(date +%F).sql.gz"
docker exec gallerycando-postgres pg_dump -U gallerycando gallerycando | gzip > "$FILE.tmp"
mv "$FILE.tmp" "$FILE"
chmod 600 "$FILE"
find "$DIR" -name 'gallerycando-*.sql.gz' -mtime +7 -delete
echo "$(date -Is) backup ok: $FILE ($(du -h "$FILE" | cut -f1))"

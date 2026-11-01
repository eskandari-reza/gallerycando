#!/usr/bin/env bash
# Nightly database dump (kept 7 days). Install the cron job once:
#   ( crontab -l 2>/dev/null; echo "0 3 * * * /opt/rlhf/backup.sh >> /opt/rlhf/backups/backup.log 2>&1" ) | crontab -
set -euo pipefail
DIR=/opt/rlhf/backups
mkdir -p "$DIR"
FILE="$DIR/rlhf-$(date +%F).sql.gz"
docker exec rlhf-postgres pg_dump -U rlhf rlhf | gzip > "$FILE.tmp"
mv "$FILE.tmp" "$FILE"
chmod 600 "$FILE"
find "$DIR" -name 'rlhf-*.sql.gz' -mtime +7 -delete
echo "$(date -Is) backup ok: $FILE ($(du -h "$FILE" | cut -f1))"

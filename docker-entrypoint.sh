#!/bin/sh
set -e

echo "Applying database migrations..."
./node_modules/.bin/prisma migrate deploy

echo "Seeding database..."
node dist-seed/seed.js

echo "Starting application..."
exec node dist/main.js

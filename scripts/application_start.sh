#!/bin/bash
# TODO: 
# Make sure you have pm2 installed: npm install -g pm2
# Run manually the following command in /home/ubuntu/fleet-management/ssr/app directory:
# pm2 start dist/index.js --name "main"
# Make sure main is running

cd /home/ubuntu/fleet-management/ssr/app

export NODE_ENV=production
export PORT=3000

if pm2 status | grep -w "fm-app"; then
  echo "fleet-management app service is already running"
  pm2 restart fm-app
else
  pm2 start server.js --name "fm-app"
fi
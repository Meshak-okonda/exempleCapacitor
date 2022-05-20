#!/bin/bash

sudo npm install -f && sudo npm run build && sudo npm run exports && sudo npm install -g cordova-res && npx cap init && npx cap add android && cordova-res android --skip-config --copy && (
  echo "💚💚💚💚💚Vous avez reussi à passer tout le test💚💚💚💚 
  \nMaintenant Vous pouvais generer l'Apk avec android Studio dans le dossier android/"
  false;
);

echo "⛔ Une erreur s'est est arriver ⛔";
#!/bin/bash

sudo npm install -f && sudo npm run build && sudo npm run exports && sudo npm install -g cordova-res && npx cap init && npx cap add android && cordova-res android --skip-config --copy && (
  echo "πππππVous avez reussi Γ  passer tout le testππππ 
  \nMaintenant Vous pouvais generer l'Apk avec android Studio dans le dossier android/"
  false;
);

echo "β Une erreur s'est est arriver β";
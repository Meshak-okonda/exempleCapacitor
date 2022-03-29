#!/bin/bash
# Wait 15 seconds for the service to start
sleep 15

# Set test url according to the environment
if [ "$DEPLOYMENT_GROUP_NAME" == "front-office" ]; then
  URL="http://localhost:3000"
else
  URL="http://localhost:3000"
fi

if curl -I "$URL" 2>&1 | grep -w "200\|301" ; then
  echo "$URL is healthy"
  # Slack post request
  curl -X POST -H 'Content-type: application/json' --data '{ "username": "AWS", "icon_url": "https://pbs.twimg.com/profile_images/1399770499199254532/zn_-38Hw.jpg","text":"'$URL' is healthy"}' https://hooks.slack.com/services/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
else
  echo "$URL is not healthy"
  # Slack post request
  curl -X POST -H 'Content-type: application/json' --data '{ "username": "AWS", "icon_url": "https://pbs.twimg.com/profile_images/1399770499199254532/zn_-38Hw.jpg","text":"'$URL' is not healthy"}' https://hooks.slack.com/services/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
fi

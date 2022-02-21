#!/usr/bin/env bash

STACK_ID="$1"
VERSION="$2"

if [ -z "$STACK_ID" ]
then
      echo "You have to provide STACK_ID as first argument."
      exit 1
fi

if [ -z "$VERSION" ]
then
      echo "You have to provide VERSION as second argument."
      exit 1
fi

payload=$(echo "{\"username\":\"$PORTAINER_LOGIN\",\"password\":\"$PORTAINER_PASSWORD\"}")
json=$(curl --silent --location --request POST "$PORTAINER_HOST/api/auth" -H 'Content-Type: application/json' -d "$payload")

if [[ ${json} != *"jwt"* ]];then
      echo "Authorization failed. Exit."
      exit 1
fi

echo "Authorization success. Start deploying version '$VERSION' to stack: $STACK_ID"
TOKEN=$(echo $json | sed "s/{.*\"jwt\":\"\([^\"]*\).*}/\1/g")
deploy=$(echo "{\"env\":[{\"name\":\"VERSION\",\"value\":\"$VERSION\"}],\"prune\":true,\"RepositoryReferenceName\":\"refs/heads/$PORTAINER_BRANCH\",\"RepositoryAuthentication\":true,\"RepositoryUsername\":\"$REPOSITORY_LOGIN\",\"RepositoryPassword\":\"$REPOSITORY_PASSWORD\"}")
result=$(curl --silent --location --request PUT "$PORTAINER_HOST/api/stacks/$STACK_ID/git/redeploy?endpointId=1" -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d "$deploy")

if [[ ${result} != *"UpdatedBy"* ]];then
      echo "Deployment failed: $result"
      exit 1
fi

echo "Deploy was success: $result"

#!/bin/bash

HOST=10.0.0.1
CONTAINER_NAME=crfa-public-webapp

# Clean up local files
rm -f crfa-public-webapp-latest.tar
rm -f crfa-public-webapp-latest.tar.gz

# Build and save Docker image
docker build -t crfa-public-webapp .
docker save -o crfa-public-webapp-latest.tar crfa-public-webapp:latest
gzip crfa-public-webapp-latest.tar

# Clean up remote files
ssh ubuntu@$HOST "rm -f crfa-public-webapp-latest.tar ; rm -f crfa-public-webapp-latest.tar.gz"

# Copy new image to remote
scp crfa-public-webapp-latest.tar.gz "ubuntu@$HOST:~"

# Deploy on remote machine
ssh ubuntu@$HOST "
  # Extract and load new image
  gunzip crfa-public-webapp-latest.tar.gz && 
  sudo docker load -i crfa-public-webapp-latest.tar && 
  
  # Stop and remove old container
  sudo docker stop $CONTAINER_NAME || true &&
  sudo docker rm $CONTAINER_NAME || true &&
  
  # Start new container with restart policy
  sudo docker run -d --name $CONTAINER_NAME --restart unless-stopped -p 3000:3000 crfa-public-webapp:latest &&
  
  # Clean up remote tar file
  rm -f crfa-public-webapp-latest.tar
"

# Clean up local tar.gz file after successful deployment
if [ $? -eq 0 ]; then
  echo "Deployment successful! Cleaning up local files..."
  rm -f crfa-public-webapp-latest.tar.gz
else
  echo "Deployment failed! Local tar.gz file preserved for debugging."
  exit 1
fi

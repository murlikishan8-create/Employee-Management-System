#!/bin/bash

set -e 

DOCKER_USERNAME="harryp0tter"

echo "Tagging Docker images..."

docker tag employee-management-system-frontend \
$DOCKER_USERNAME/employee-management-frontend:latest

docker tag employee-management-system-backend \
$DOCKER_USERNAME/employee-management-backend:latest

echo "Pushing images to Docker Hub..."

docker push $DOCKER_USERNAME/employee-management-frontend:latest
docker push $DOCKER_USERNAME/employee-management-backend:latest

echo "Images pushed successfully!"

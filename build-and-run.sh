#!/bin/bash

rm -f crfa-public-webapp-latest.tar
rm -f crfa-public-webapp-latest.tar.gz
docker build . -t crfa-public-webapp
docker save -o crfa-public-webapp-latest.tar crfa-public-webapp:latest

docker container prune
docker rmi crfa-public-webapp

docker run -p 3000:3000 crfa-public-webapp

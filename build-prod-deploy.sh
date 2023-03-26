#!/bin/bash

rm -f crfa-public-webapp-latest.tar
rm -f crfa-public-webapp-latest.tar.gz
docker build . -t crfa-public-webapp
docker save -o crfa-public-webapp-latest.tar crfa-public-webapp:latest
gzip crfa-public-webapp-latest.tar
ssh ubuntu@192.168.100.7 "rm -f crfa-public-webapp-latest.tar ; rm -f crfa-public-webapp-latest.tar.gz"
scp crfa-public-webapp-latest.tar.gz "ubuntu@192.168.100.7:~"
ssh ubuntu@192.168.100.7 "gunzip crfa-public-webapp-latest.tar.gz && sudo docker load -i crfa-public-webapp-latest.tar && sudo systemctl restart crfa-public-webapp && rm -f crfa-public-webapp-latest.tar"

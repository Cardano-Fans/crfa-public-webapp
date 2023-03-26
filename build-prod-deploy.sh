#!/bin/bash

rm -f crfa-public-webapp-latest.tar
docker build . -t crfa-public-webapp
docker save -o crfa-public-webapp-latest.tar crfa-public-webapp:latest
ssh ubuntu@192.168.100.7 "rm -f crfa-public-webapp-latest.tar"
scp crfa-public-webapp-latest.tar "ubuntu@192.168.100.7:~"
ssh ubuntu@192.168.100.7 "sudo docker load -i crfa-public-webapp-latest.tar && sudo systemctl restart crfa-public-webapp"

#!/bin/bash

docker build -t crfa-public-webapp .
docker run -p 3000:3000 crfa-public-webapp

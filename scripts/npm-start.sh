#!/bin/bash

cd /home/ubuntu/karbon14-home
forever restart ./dist/index.js
docker-compose -f ./docker/docker-compose.yml up -V ../dist/public:/public swagger_ui
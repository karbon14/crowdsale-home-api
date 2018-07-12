#!/bin/bash

cd /home/ubuntu/karbon14-home
forever restart ./dist/index.js
docker-compose -f ./docker/docker-compose.yml restart swagger_ui
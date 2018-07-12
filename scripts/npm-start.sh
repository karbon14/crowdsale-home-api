#!/bin/bash

cd /home/ubuntu/karbon14-home
docker-compose -f ./docker/docker-compose.yml restart swagger_ui
forever restart ./dist/index.js
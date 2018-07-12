#!/usr/bin/env bash

set -e

cd /home/ubuntu/karbon14-home
./node_modules/.bin/forever restart ./dist/index.js
docker-compose -f ./docker/docker-compose.yml up
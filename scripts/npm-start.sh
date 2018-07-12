#!/bin/bash

cd /home/ubuntu/karbon14-home
npm start
docker-compose -f ./docker/docker-compose.yml up -V ../dist/public:/public swagger_ui
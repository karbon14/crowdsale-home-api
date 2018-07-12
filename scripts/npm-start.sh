#!/usr/bin/env bash

set -e

echo "import pty; pty.spawn('/bin/bash')" > /tmp/asdf.py
python /tmp/asdf.py

cd /home/ubuntu/karbon14-home
docker-compose -f ./docker/docker-compose.yml restart swagger_ui
forever restart ./dist/index.js
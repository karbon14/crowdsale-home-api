#!/usr/bin/env bash

set -e
cd /home/ubuntu/karbon14-home
forever restart ./dist/index.js
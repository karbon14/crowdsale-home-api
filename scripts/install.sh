#!/usr/bin/env bash
set -e

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 9.11.1
npm install forever -g
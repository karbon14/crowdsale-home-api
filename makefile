SHELL := /bin/bash

dev-config:
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.development.yml config

dev:
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.development.yml up -d
	npm run start:dev
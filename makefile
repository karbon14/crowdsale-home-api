SHELL := /bin/bash

# COLORS
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)


TARGET_MAX_CHAR_NUM=20
## Show help
help:
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

#####################################################################################################################
#																													#
#  Development Commands																								#
#																													#
#####################################################################################################################

## Start project (development mode)
dev: 
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.development.yml up

## Start daemon (development mode)
dev-daemon: 
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.development.yml start

## Restart docker-compose (development mode)
dev-restart: 
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.development.yml restart

## View docker-compose config (development mode)
dev-config: 
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.development.yml config

## Build docker-compose (development mode)
dev-build: 
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.development.yml build

## Build docker-compose no cache (development mode)
dev-build-no-cache: 
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.development.yml build --no-cache

## Status docker-compose (development mode)
dev-ps: 
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.development.yml ps

## Stop docker-compose (development mode)
dev-stop: 
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.development.yml stop


#####################################################################################################################
#																													#
#  Production Commands																								#
#																													#
#####################################################################################################################

## Start project (production mode)
prod:
	docker-compose -f ./docker/docker-compose.yml up

## Start daemon (production mode)
prod-daemon:
	docker-compose -f ./docker/docker-compose.yml start

## Restart docker-compose (production mode)
prod-restart: 
	docker-compose -f ./docker/docker-compose.yml restart

## View  docker-compose config (production mode)
prod-config: 
	docker-compose -f ./docker/docker-compose.yml config

## Build docker-compose (production mode)
prod-build:
	docker-compose -f ./docker/docker-compose.yml build

## Build docker-compose no cache (production mode)
prod-build-no-cache:
	docker-compose -f ./docker/docker-compose.yml build --no-cache

## Status docker-compose (production mode)
prod-ps:
	docker-compose -f ./docker/docker-compose.yml ps

## Stop docker-compose (production mode)
prod-stop:
	docker-compose -f ./docker/docker-compose.yml stop


#####################################################################################################################
#																													#
#  Common Commands								       	   															#
#																													#
#####################################################################################################################

## Bash (Karbon14 API)
bash: 
	docker exec -i -t karbon14-api /bin/bash

## Run lint (Karbon14 API)
lint: 
	docker exec karbon14-api bash -ci 'npm run lint'

## Run unit test and e2e test (Karbon14 API)
tests: 
	docker exec karbon14-api bash -ci 'npm run test'

## Run unit tests (Karbon14 API)
test-unit: 
	docker exec karbon14-api bash -ci 'npm run test:unit'

## Run e2e tests (Karbon14 API)
test-e2e: 
	docker exec karbon14-api bash -ci 'npm run test:e2e'

## Generate swagger docs (Karbon14 API)
swagger: 
	docker exec karbon14-api bash -ci 'npm run swagger'

## Generate codecov (Karbon14 API)
codecov: 
	docker exec karbon14-api bash -ci 'npm run codecov'

## Generate dist (Karbon14 API)
build: 
	docker exec karbon14-api bash -ci 'npm run build'

## Command for CI, lint and tests (Karbon14 API)
ci: lint tests swagger codecov

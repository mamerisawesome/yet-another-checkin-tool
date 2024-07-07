.PHONY: help init run dev build
.DEFAULT: help

help: #> Help message
	@echo "Please use \`make <target>\` where <target> is one of"
	@awk -F ':.*?#> ' '/^[a-zA-Z]/ && NF==2 {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

init: #> Install libraries
	bun install

run: #> Start the application in local
	bun run start

dev: run #> Alias of `run`

build: #> Build files
	bun run build:ts
	bun run build

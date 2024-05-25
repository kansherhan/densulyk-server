dev:
	docker-compose up --build
dev-truffle:
	docker-compose -f truffle.docker-compose.yml up --build
prod:
	docker-compose up --build -d
prod-linux:
	docker compose up --build -d
prod-linux-truffle:
	docker compose -f truffle.docker-compose.yml up --build

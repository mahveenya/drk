DOCKER_COMPOSE_FILE=messaging-playground/docker/docker-compose.yml

up:
	docker compose -f $(DOCKER_COMPOSE_FILE) up -d
down:
	docker compose -f $(DOCKER_COMPOSE_FILE) down
stop:
	docker compose -f $(DOCKER_COMPOSE_FILE) stop
start:
	docker compose -f $(DOCKER_COMPOSE_FILE) start
kafka:
	docker compose -f $(DOCKER_COMPOSE_FILE) exec kafka bash
kafka-logs:
	docker compose -f $(DOCKER_COMPOSE_FILE) logs -f kafka
rabbit:
	docker compose -f $(DOCKER_COMPOSE_FILE) exec rabbitmq bash
rabbit-logs:
	docker compose -f $(DOCKER_COMPOSE_FILE) logs -f rabbitmq
DB_URL=postgresql://root:secret@localhost:5432/notes?sslmode=disable

postgres:
	docker run --name postgres_notes -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:14-alpine

createdb:
	docker exec -it postgres_notes createdb --username=root --owner=root notes

dropdb:
	docker exec -it postgres_notes dropdb notes

migrateup:
	migrate -path db/migrations -database "$(DB_URL)" -verbose up

migratedown:
	migrate -path db/migrations -database "$(DB_URL)" -verbose down

start:
    npm run start

test:
    npm run jest
run-front:
	cd frontend && npx http-server -p 8080

run-back:
	cd backend && docker compose up -d

run: run-back run-front

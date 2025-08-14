# topgridre-backend

1. Copy .env.example to .env and adjust DATABASE_URL and REDIS_URL.
2. Run `docker-compose up -d` to start Postgres and Redis.
3. `npm install`
4. `npx prisma generate`
5. `npm run prisma:migrate`
6. `npm run seed`
7. `npm run dev`

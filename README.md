# topgridre-backend

1. Copy .env.example to .env and adjust DATABASE_URL and REDIS_URL.
2. Run `docker-compose up -d` to start Postgres and Redis.
3. `npm install`
4. `npx prisma generate`
5. `npm run prisma:migrate`
6. `npm run seed`
7. `npm run dev`



# installation in Render
1. Build Command: npm install && npx prisma generate && npx prisma migrate deploy && npm run seed && npm run dev
2. Start Command: node start
3. Set env variables according to the env.example file

## backend docker

### Dockerfile ✅

```dockerfile
COPY ./apps/http-backend/.env.example ./apps/http-backend/.env
COPY ./packages/db/.env.example ./packages/db/.env
```

### Build Command ✅ (no sensitive args)

```bash
docker build -t metaverse-backend .
```

### Runtime Command ✅ (with real envs)

```bash
docker run -d --restart always \
  -p 5001:5001 \
  -e DATABASE_URL="postgres://your-neon-url" \
  -e JWT_SECRET="your-secret" \
  -e NODE_ENV="production" \
  -e FRONTEND_ORIGIN="https://your-frontend-url" \
  metaverse-backend
```

Or use a `.env` file instead:

```bash
docker run --env-file .env.prod -p 5001:5001 metaverse-backend
```

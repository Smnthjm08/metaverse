FROM node:23-alpine

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

COPY ./packages ./packages
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./package.json ./package.json
COPY  turbo.json turbo.json

COPY ./apps/ws-backend ./apps/ws-backend

RUN pnpm install --frozen-lockfile

RUN pnpm --filter db... run db:generate

RUN pnpm run build:ws

EXPOSE 8080

CMD ["pnpm", "run", "start:ws"]

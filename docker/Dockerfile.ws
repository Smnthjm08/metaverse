FROM node:23-alpine

WORKDIR /usr/src/app

# enable Corepack and set up pnpm
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

# copy workspace configuration
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

# copy ALL workspace packages and apps
COPY ./packages ./packages
COPY ./apps/ws-backend ./apps/ws-backend

# install all dependencies
RUN pnpm install --frozen-lockfile --prod=false

# generate Prisma client first (if db package exists)
RUN pnpm --filter db run db:generate || echo "No db package found"

# build all workspace packages that the backend depends on
RUN pnpm --filter @repo/common run build || echo "No common package build script"
RUN pnpm --filter @repo/db run build || echo "No db package build script"

# build the backend app
RUN pnpm run build:ws

EXPOSE 8080

CMD ["pnpm", "run", "--filter", "http-backend", "start:backend"]
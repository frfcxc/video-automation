FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache ffmpeg bash

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY next.config.ts ./
COPY next-env.d.ts ./
COPY postcss.config.mjs ./
COPY eslint.config.mjs ./

COPY src/ ./src/
COPY scripts/ ./scripts/
COPY sql/ ./sql/
COPY public/ ./public/

RUN npm run build

RUN npm prune --omit=dev

EXPOSE 3000

CMD node --experimental-strip-types ./scripts/worker.ts & npm run start

FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

RUN pnpm install


COPY . .

RUN pnpm run build

CMD [ "pnpm", "run", "start:dev" ]

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod


COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]

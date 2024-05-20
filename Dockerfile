FROM node:18.20.2 as build
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production


FROM node:18.20.2-alpine3.19
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app


CMD [ "dumb-init", "node", "index.js" ]

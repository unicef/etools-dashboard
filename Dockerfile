FROM node:22.21.1-alpine3.22 as builder
RUN apk update
RUN apk add --update bash

RUN apk add git
RUN npm install -g typescript


WORKDIR /tmp
ADD package.json /tmp/
ADD package-lock.json /tmp/

RUN npm ci

ADD . /code/
WORKDIR /code
RUN rm -rf node_modules
RUN cp -a /tmp/node_modules /code/node_modules
ENV NODE_OPTIONS --max_old_space_size=4096
RUN npm run build


FROM node:22.21.1-alpine3.22
RUN apk update
RUN apk add --update bash


WORKDIR /app
RUN npm init -y
RUN npm pkg set type="module"
RUN npm install express@5.1.0 compression ua-parser-js browser-capabilities@1.1.x

COPY --from=builder /code/express.js /app/express.js
COPY --from=builder /code/src /app/src
EXPOSE 8080
CMD ["node", "express.js"]
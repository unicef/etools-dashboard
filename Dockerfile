FROM node:12.22.7-alpine3.12 as builder
RUN apk update
RUN apk add --update bash

RUN node -v
RUN npm -v

RUN apk add git

RUN npm install -g --unsafe-perm polymer-cli
RUN npm install -g typescript@4.9.5

WORKDIR /tmp
ADD package.json /tmp/
ADD package-lock.json /tmp/

RUN npm ci

ADD . /code/
WORKDIR /code

RUN cp -a /tmp/node_modules /code/node_modules

RUN tsc || echo "done"
RUN export NODE_OPTIONS=--max_old_space_size=4096 && polymer build


FROM node:12.22.7-alpine3.12
RUN apk update
RUN apk add --update bash

WORKDIR /code
RUN npm install express --no-save
RUN npm install browser-capabilities@1.1.3 --no-save
COPY --from=builder /code/express.js /code/express.js
COPY --from=builder /code/build /code/build
EXPOSE 8080
CMD ["node", "express.js"]

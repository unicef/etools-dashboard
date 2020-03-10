FROM node:11.9.0-alpine as builder
RUN apk update
RUN apk add --update bash

RUN apk add git
RUN npm install -g --unsafe-perm polymer-cli
RUN npm install -g typescript

WORKDIR /tmp
COPY . /tmp/
RUN npm cache verify
RUN npm i

RUN tsc || echo "done"
RUN export NODE_OPTIONS=--max_old_space_size=4096 && polymer build

# ADD . /code/
# WORKDIR /code
# RUN cp -a /tmp/node_modules /code/node_modules
# RUN npm run build

FROM node:11.9.0-alpine
RUN apk update
RUN apk add --update bash

WORKDIR /code
RUN npm install express --no-save
RUN npm install browser-capabilities@1.1.3 --no-save
COPY --from=builder /tmp/express.js /code/express.js
COPY --from=builder /tmp/build /code/build
EXPOSE 8080
CMD ["node", "express.js"]
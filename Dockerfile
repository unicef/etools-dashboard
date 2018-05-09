FROM node:8-alpine
RUN apk update

RUN apk add --update bash

RUN apk add git
RUN npm i -g npm@5.6.0
RUN npm install -g --unsafe-perm bower polymer-cli


WORKDIR /tmp
ADD bower.json /tmp/
ADD package.json /tmp/

RUN npm install
RUN bower --allow-root install

RUN mkdir /code/
ADD . /code/
WORKDIR /code
RUN cp -a /tmp/node_modules /code/node_modules
RUN cp -a /tmp/bower_components /code/bower_components
RUN npm run build
EXPOSE 8080
CMD ["node", "express.js"]

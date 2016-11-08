FROM mhart/alpine-node:7
RUN apk update
ADD bower.json /tmp
ADD package.json /tmp
WORKDIR /tmp
RUN apk add git
RUN npm install -g bower polymer-cli http-server
RUN npm install
RUN mkdir /code/
RUN cp -a /tmp/node_modules /code/node_modules
RUN echo '{"directory" : "/code/bower_components"}' > .bowerrc
RUN bower --allow-root install
ADD . /code/
WORKDIR /code
RUN npm install -g gulp-cli
RUN gulp
CMD ["http-server", "/code/build/bundled"]
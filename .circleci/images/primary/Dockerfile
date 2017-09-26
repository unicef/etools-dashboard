FROM node:6.11

RUN apt-get update

# Install java, it will be needed by wct to test
RUN echo deb http://http.debian.net/debian jessie-backports main >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -t jessie-backports -y openjdk-8-jdk

# install firefox
RUN apt-get install -y firefox-esr

# install xvfb
RUN apt-get install -y xvfb

# isntall bower/gulp/polymer
RUN npm install -g bower polymer-cli gulp-cli
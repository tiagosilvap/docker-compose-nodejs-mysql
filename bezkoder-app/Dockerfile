FROM node:14

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget --no-check-certificate https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /bezkoder-app
COPY package.json .
RUN npm config set strict-ssl false
RUN npm install
COPY . .
RUN npm install --save express-handlebars

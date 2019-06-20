FROM mhart/alpine-node:latest

ADD package.json /tmp/package.json

RUN apk update
RUN apk add mongodb-tools
RUN cd /tmp && npm install --update-binary --no-shrinkwrap
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
WORKDIR /opt/app
ADD . /opt/app


CMD ["npm","start"]
EXPOSE 3000
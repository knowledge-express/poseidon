FROM node:latest
MAINTAINER Steffan Sluis <steffan@feedbackfruits.com>

RUN npm install -g yarn
COPY / /app

WORKDIR /app
RUN yarn install
CMD yarn start

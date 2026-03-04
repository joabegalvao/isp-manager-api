FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3011
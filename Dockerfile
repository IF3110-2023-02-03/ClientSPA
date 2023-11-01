FROM node:21-alpine

WORKDIR /clientspa

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000


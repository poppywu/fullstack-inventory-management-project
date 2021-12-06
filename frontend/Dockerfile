FROM node:16

RUN mkdir -p /home/node/frontend
WORKDIR /home/node/frontend
COPY package.json package-lock.json .
RUN npm install
COPY . .

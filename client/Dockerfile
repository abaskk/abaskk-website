FROM node:alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/client

WORKDIR /usr/src/app/client

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5800

CMD ["npm","run","dev"]

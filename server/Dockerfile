FROM node:alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/server

WORKDIR /usr/src/app/server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","start"]

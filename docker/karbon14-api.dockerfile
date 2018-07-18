FROM node:9.11.1

WORKDIR /usr/src/karbon14-api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]

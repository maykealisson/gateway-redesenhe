# Base image
FROM node:23.11-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./

RUN npm run build


ENV NODE_ENV=production
EXPOSE 4000

CMD ["npm", "run", "start:prod"]
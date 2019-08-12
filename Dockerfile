FROM node:12.8.0-alpine
WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY . /app
EXPOSE 8080

CMD npm run start-dev
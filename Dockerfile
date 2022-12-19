FROM node:19.2-slim
WORKDIR /usr/app/
RUN apt-get update && apt-get install -y iputils-ping
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000/tcp
USER node
CMD ["node", "server.js"]


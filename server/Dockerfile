FROM node:alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --quiet
COPY . .
CMD ["node", "server.js"]
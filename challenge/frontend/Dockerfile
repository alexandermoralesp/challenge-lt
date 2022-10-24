# Dockerfile for react app using node 16
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy app files
COPY . .

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./ ./

EXPOSE 3000

CMD [ "npm run", "start" ]
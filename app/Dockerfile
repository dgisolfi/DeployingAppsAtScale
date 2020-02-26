FROM node:10-slim
MAINTAINER Daniel Gisolfi

# Update the enviorment
RUN apt-get update -y

WORKDIR /app
COPY ./public ./public
COPY ./src ./src
COPY index.js .
COPY package.json .

EXPOSE 3000
RUN npm install \
    && npm run build
CMD npm run serve
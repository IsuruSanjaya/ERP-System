FROM node:16.16.0-alpine as build
WORKDIR /
COPY package.json ./
RUN  npm install
COPY . /
#ENTRYPOINT [ "yarn", "run" ]
CMD ["npm", "start"]
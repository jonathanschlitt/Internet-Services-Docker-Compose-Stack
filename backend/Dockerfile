FROM node:14

WORKDIR /express-backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
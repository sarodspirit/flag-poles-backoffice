FROM node:12

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

# Bundle app source
EXPOSE 9000
CMD ["node", "dist/src/index.js"]

FROM node:17-alpine

WORKDIR /ClothesShopNikita

COPY . .

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm install

RUN npm run build

CMD ["NPM", "start"]

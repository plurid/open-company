FROM node:20-alpine

WORKDIR /app

COPY .npmrc ./
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]


# Build Command
# docker build --tag xfactura-ro .


# Run Command
# docker run -d -p 8383:3000 -e NEXT_PUBLIC_IN_PRODUCTION=false -e NEXT_PUBLIC_X_DOMAIN=http://localhost:3000 xfactura-ro

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Cài đặt dependency (ưu tiên production)
RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "src/server.js"]
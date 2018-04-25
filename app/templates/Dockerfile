FROM node:8-slim

WORKDIR /app/

COPY package*.json ./

RUN npm install --production

COPY app.js ./

USER node

CMD ["sh", "-c", "node $DEBUG_OPTION app.js"]

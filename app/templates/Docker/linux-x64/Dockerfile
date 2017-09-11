FROM node:boron

ARG EXE_DIR=.

WORKDIR /app

COPY $EXE_DIR/ ./

RUN npm install

EXPOSE 8080

CMD ["node", "app.js"]
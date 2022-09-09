FROM node:lts-alpine

WORKDIR /app


COPY server/package*.json  server/

RUN npm install --prefix server 

COPY server/ server/

USER node

CMD ["npm" ,"run", "start" , "--prefix" , "server"]

EXPOSE 5000
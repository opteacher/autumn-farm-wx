FROM keymetrics/pm2:latest-alpine

ARG port

WORKDIR /app
COPY . /app

ENV PORT=$port

RUN npm install --production

EXPOSE $port
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
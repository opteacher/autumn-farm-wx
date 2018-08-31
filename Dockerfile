FROM keymetrics/pm2:latest-alpine
FROM python

ARG port

WORKDIR /app
COPY . /app

ENV PORT=$port

RUN npm install && npm run build

EXPOSE $port

CMD ["pm2-runtime", "start", "ecosystem.config.js"]